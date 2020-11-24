import { injectable } from "inversify";
import { Op, QueryTypes, Sequelize } from 'sequelize';

import { IParkingSpaceRepository } from '../interfaces/IRepositories/parking-spaceRepository.interface';
import { ParkingSpace, ParkingSpaceDAO } from '../models/parking-space.model';
import { TransactionType } from "../../commons/enums/transactionType";
import { Scheduling } from '../models/scheduling.model';

@injectable()
export class ParkingSpaceRepository implements IParkingSpaceRepository {

  save(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpaceDAO.sequelize.transaction();
      parkingSpace.status = TransactionType.ACTIVE;
      ParkingSpaceDAO.create(parkingSpace, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new ParkingSpace(result));
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpaceDAO.sequelize.transaction();
      ParkingSpaceDAO.update(parkingSpace,
        {
          where:
          {
            id: { [Op.eq]: parkingSpace.id }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  updateAll(parkingSpace: ParkingSpace, status: TransactionType): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpaceDAO.sequelize.transaction();
      ParkingSpaceDAO.update(parkingSpace,
        {
          where:
          {
            status: { [Op.eq]: status },
            type: { [Op.eq]: parkingSpace.type },
            parkingId: { [Op.eq]: parkingSpace.parkingId }
          },
          transaction: _transaction,
          validate: false,
          limit: parkingSpace.amount
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpaceDAO.sequelize.transaction();
      ParkingSpaceDAO.update({ status: TransactionType.DELETED },
        {
          where: {
            id: { [Op.eq]: _id }
          },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.commit();
          reject(error);
        });
    });
  }

  deleteGroupType(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpaceDAO.sequelize.transaction();
      ParkingSpaceDAO.update({ status: TransactionType.DELETED, },
        {
          where: {
            type: { [Op.eq]: parkingSpace.type },
            parkingId: { [Op.eq]: parkingSpace.parkingId, },
            status: { [Op.eq]: TransactionType.ACTIVE }
          },
          limit: Number(parkingSpace.amount),
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]> {
    return new Promise(async (resolve, reject) => {
      ParkingSpaceDAO.sequelize.query(
        "   SELECT PS.* FROM ParkingSpace AS PS" +
        "   WHERE NOT EXISTS ( SELECT PS1.* FROM ParkingSpace AS PS1" +
        "                      INNER JOIN Scheduling AS S1" +
        "                       ON S1.PARKINGSPACEID = PS1.ID" +
        "                      WHERE S1.STATUS NOT IN ('EX', 'PD')" +
        "                       AND S1.DATE = :date" +
        "                       AND S1.PARKINGID = :parkingId" +
        "                       AND PS1.PARKINGID = :parkingId" +
        "                       AND PS.ID = PS1.ID" +
        "                       AND (( S1.AVALIABLETIME BETWEEN :avaliableTime AND :unavailableTime" +
        "                             OR S1.UNAVAILABLETIME BETWEEN :avaliableTime AND :unavailableTime )" +
        "                             OR (S1.AVALIABLETIME < :avaliableTime AND S1.UNAVAILABLETIME > :unavailableTime )))" +
        "     AND PS.STATUS NOT IN ('EX', 'PD')" +
        "     AND PS.PARKINGID = :parkingId" +
        "     AND PS.TYPE IN (:type, 'BOTH')",
        {
          replacements: {
            date: scheduling.date,
            avaliableTime: scheduling.avaliableTime,
            unavailableTime: scheduling.unavailableTime,
            type: scheduling.vehicleType,
            parkingId: scheduling.parkingId
          },
          type: QueryTypes.SELECT,
          mapToModel: true
        }
      )
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    });
  }

  getByParkingId(id: number): Promise<ParkingSpace[]> {
    return new Promise(async (resolve, reject) => {
      ParkingSpaceDAO.findAll({
        where: {
          parkingId: { [Op.eq]: id },
          status: { [Op.eq]: TransactionType.ACTIVE },
        },
        group: ['type', 'value'],
        attributes: ['value', 'type', 'parkingId', [Sequelize.fn('COUNT', Sequelize.col('type')), 'amount']],
        raw: true
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getListByParkingId(id: number): Promise<ParkingSpace[]> {
    return new Promise(async (resolve, reject) => {
      ParkingSpaceDAO.findAll({
        where: {
          parkingId: { [Op.eq]: id },
          status: { [Op.eq]: TransactionType.ACTIVE },
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<ParkingSpace> {
    return new Promise((resolve, reject) => {
      ParkingSpaceDAO.findByPk(id)
        .then((result: any) => resolve(new ParkingSpace(result)))
        .catch((error: any) => reject(error));
    });
  }

  getDeletedByParkingId(_parkingspace: ParkingSpace): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      ParkingSpaceDAO.findAll(
        {
          where:
          {
            parkingId: { [Op.eq]: _parkingspace.parkingId },
            type: { [Op.eq]: _parkingspace.type, },
            status: { [Op.eq]: TransactionType.DELETED }
          }
        })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  toList(): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      ParkingSpaceDAO.findAll({
        where: {
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}