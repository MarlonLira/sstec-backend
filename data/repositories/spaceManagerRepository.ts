import { Op } from 'sequelize';

import ISpaceManagerRepository from '../interfaces/IRepositories/ISpaceManagerRepository';
import SpaceManager from '../models/spaceManager';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Gustavo Gusmão
 * @class SpaceManagerRepository
 * @implements {ISpaceManagerRepository}
 */
@injectable()
class SpaceManagerRepository implements ISpaceManagerRepository {

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {SpaceManager} spaceManager
   * @returns {Promise<any>}
   * @memberof SpaceManagerRepository
   */
  Save(spaceManager: SpaceManager): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SpaceManager.sequelize.transaction();
      spaceManager.status = TransactionType.ACTIVE;
      SpaceManager.create(spaceManager, { transaction: _transaction })
        .then(async (createdSpaceManager: SpaceManager) => {
          await _transaction.commit();
          resolve({ "spaceManagerId": createdSpaceManager.id })
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
   * @returns {Promise<SpaceManager>}
   * @memberof SpaceManagerRepository
   */
  GetById(id: number): Promise<SpaceManager> {
    return new Promise(async (resolve, reject) => {
      SpaceManager.findByPk(id)
        .then((foundSpaceManager: SpaceManager) => {
          resolve(foundSpaceManager)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _parkingSpaceId
   * @returns {Promise<SpaceManager[]>}
   * @memberof SpaceManagerRepository
   */
  GetByParkingSpaceId(_parkingSpaceId: number): Promise<SpaceManager[]> {
    return new Promise(async (resolve, reject) => {
      SpaceManager.findAll(
        {
          where: {
            parkingSpaceId: _parkingSpaceId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((foundSpaceManagers: SpaceManager[]) => {
          resolve(foundSpaceManagers);
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
   * @memberof SpaceManagerRepository
   */
  Delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SpaceManager.sequelize.transaction();
      SpaceManager.update({
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
   * @param {SpaceManager} spaceManager
   * @returns {Promise<any>}
   * @memberof SpaceManagerRepository
   */
  Update(spaceManager: SpaceManager): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await SpaceManager.sequelize.transaction();
      SpaceManager.update(spaceManager.ToModify(),
        {
          where:
          {
            id: spaceManager.id
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

export default SpaceManagerRepository;