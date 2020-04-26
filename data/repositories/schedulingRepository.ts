import { Op } from 'sequelize';

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