import { Op, QueryTypes } from 'sequelize';

import { ISchedulingRepository } from '../interfaces/IRepositories/schedulingRepository.interface';
import { Scheduling, SchedulingDAO } from '../models/scheduling.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { SchedulingProductDAO } from '../models/scheduling-product.model';

@injectable()
export class SchedulingRepository implements ISchedulingRepository {

  save(scheduling: Scheduling): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingDAO.sequelize.transaction();
      SchedulingDAO.create(scheduling, { transaction: _transaction })
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

  getById(id: number): Promise<Scheduling> {
    return new Promise(async (resolve, reject) => {
      SchedulingDAO.findByPk(id, {
        include: [{ model: SchedulingProductDAO, as: 'schedulingProducts', where: { status: { [Op.ne]: TransactionType.DELETED } }, required: false }],
      })
        .then((result: any) => resolve(new Scheduling(result)))
        .catch((error: any) => reject(error));
    });
  }

  returnIfExists(scheduling: Scheduling): Promise<Scheduling[]> {
    return new Promise(async (resolve, reject) => {
      SchedulingDAO.sequelize.query(
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
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByParkingId(_parkingId: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      SchedulingDAO.findAll({
        where: {
          parkingId: { [Op.eq]: _parkingId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByCompanyId(_companyId: number): Promise<Scheduling[]> {
    return new Promise(async (resolve, reject) => {
      SchedulingDAO.sequelize.query(
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
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByUserId(_userId: number): Promise<Scheduling[]> {
    return new Promise(async (resolve, reject) => {
      SchedulingDAO.findAll(
        {
          where: {
            userId: { [Op.eq]: _userId },
            status: { [Op.ne]: TransactionType.DELETED }
          }
        }
      )
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingDAO.sequelize.transaction();
      SchedulingDAO.update({ status: TransactionType.DELETED },
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
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(scheduling: Scheduling): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SchedulingDAO.sequelize.transaction();
      SchedulingDAO.update(scheduling,
        {
          where: {
            id: { [Op.eq]: scheduling.id }
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
}