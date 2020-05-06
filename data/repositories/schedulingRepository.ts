import { Op, QueryTypes } from 'sequelize';

import ISchedulingRepository from '../interfaces/IRepositories/ISchedulingRepository';
import Scheduling from '../models/scheduling';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Gustavo Gusmão
 * @class SchedulingRepository
 * @implements {ISchedulingRepository}
 */
@injectable()
class SchedulingRepository implements ISchedulingRepository {

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Scheduling} scheduling
   * @returns {Promise<any>}
   * @memberof SchedulingRepository
   */
  Save(scheduling: Scheduling): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Scheduling.sequelize.transaction();
      scheduling.status = TransactionType.ACTIVE;
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<Scheduling>}
   * @memberof SchedulingRepository
   */
  GetById(id: number): Promise<Scheduling> {
    return new Promise(async (resolve, reject) => {
      Scheduling.findByPk(id)
        .then((foundScheduling: Scheduling) => {
          resolve(foundScheduling)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Scheduling} scheduling
   * @returns {Promise<Scheduling[]>}
   * @memberof SchedulingRepository
   */
  ReturnIfExists(scheduling: Scheduling): Promise<Scheduling[]> {
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
        .then((result: Scheduling[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  ToList(_parkingId: number): Promise<Scheduling[]> {
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
        .then((result: Scheduling[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _userId
   * @returns {Promise<Scheduling[]>}
   * @memberof SchedulingRepository
   */
  GetByUserId(_userId: number): Promise<Scheduling[]> {
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
        .then((foundSchedulings: Scheduling[]) => {
          resolve(foundSchedulings);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof SchedulingRepository
   */
  Delete(_id: number): Promise<any> {
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Scheduling} scheduling
   * @returns {Promise<any>}
   * @memberof SchedulingRepository
   */
  Update(scheduling: Scheduling): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Scheduling.sequelize.transaction();
      Scheduling.update(scheduling.ToModify(),
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

export default SchedulingRepository;