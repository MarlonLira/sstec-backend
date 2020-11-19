import { Op, QueryTypes } from 'sequelize';

import { ISchedulingRepository } from '../interfaces/IRepositories/schedulingRepository.interface';
import { Scheduling } from '../models/scheduling.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { SchedulingProduct } from '../models/scheduling-product.model';

@injectable()
export class SchedulingRepository implements ISchedulingRepository {

  save(scheduling: Scheduling): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Scheduling.sequelize.transaction();
      Scheduling.create(scheduling, { transaction: _transaction })
        .then(async (createdScheduling: Scheduling) => {
          await _transaction.commit();
          resolve({ "schedulingId": createdScheduling.id })
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error)
        });
    });
  }

  getById(id: number): Promise<Scheduling> {
    return new Promise(async (resolve, reject) => {
      Scheduling.findByPk(id, {
        include: [{ model: SchedulingProduct, as: 'schedulingProducts' }],
        raw: true,
        nest: true,
      })
        .then((result: Scheduling) => {
          console.log(result)
          resolve(result)})
        .catch(error => reject(error));
    });
  }

  returnIfExists(scheduling: Scheduling): Promise<Scheduling[]> {
    return new Promise(async (resolve, reject) => {
      Scheduling.sequelize.query(
        "   SELECT S.* FROM Scheduling AS S" +
        "   WHERE EXISTS ( SELECT S1.* FROM ParkingSpace AS PS1" +
        "                  INNER JOIN Scheduling AS S1" +
        "                    ON S1.PARKINGSPACEID = PS1.ID" +
        "                  WHERE S1.STATUS NOT IN ('EX', 'PD')" +
        "                    AND S1.DATE = :date" +
        "                    AND S.ID = S1.ID" +
        "                    AND (( S1.AVALIABLETIME BETWEEN :avaliableTime AND :unavailableTime" +
        "                             OR S1.UNAVAILABLETIME BETWEEN :avaliableTime AND :unavailableTime )" +
        "                             OR (S1.AVALIABLETIME < :avaliableTime AND S1.UNAVAILABLETIME > :unavailableTime )))" +
        "     AND S.STATUS NOT IN ('EX', 'PD')" +
        "     AND S.USERID = :userId",
        {
          replacements: {
            date: scheduling.date,
            avaliableTime: scheduling.avaliableTime,
            unavailableTime: scheduling.unavailableTime,
            userId: scheduling.userId
          },
          type: QueryTypes.SELECT,
          mapToModel: true
        }
      )
        .then((result: Scheduling[]) => resolve(result))
        .catch(error => reject(error));
    });
  }

  getByParkingId(_parkingId: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      Scheduling.findAll({
        where: {
          parkingId: {
            [Op.eq]: _parkingId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: Scheduling[]) => resolve(result))
        .catch(error => reject(error));
    });
  }

  getByCompanyId(_companyId: number): Promise<Scheduling[]> {
    return new Promise(async (resolve, reject) => {
      Scheduling.sequelize.query(
        "   SELECT S.* FROM Scheduling AS S" +
        "   INNER JOIN Parking AS P" +
        "     ON S.PARKINGID = P.ID" +
        "   INNER JOIN Company AS C" +
        "     ON P.COMPANYID = C.ID" +
        "   WHERE S.STATUS = 'AT'" +
        "     AND C.STATUS = 'AT'" +
        "     AND C.ID = :companyId",
        {
          replacements: {
            companyId: _companyId
          },
          type: QueryTypes.SELECT,
          mapToModel: true
        }
      )
        .then((result: Scheduling[]) => resolve(result))
        .catch(error => reject(error));
    });
  }

  getByUserId(_userId: number): Promise<Scheduling[]> {
    return new Promise(async (resolve, reject) => {
      Scheduling.findAll(
        {
          where: {
            userId: _userId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((result: Scheduling[]) => resolve(result))
        .catch(error => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Scheduling.sequelize.transaction();
      Scheduling.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(scheduling: Scheduling): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Scheduling.sequelize.transaction();
      Scheduling.update(scheduling.ToAny(),
        {
          where:
          {
            id: scheduling.id
          },
          transaction: _transaction,
          validate: false
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}