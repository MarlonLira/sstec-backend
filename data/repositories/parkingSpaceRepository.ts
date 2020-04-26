import { injectable } from "inversify";
import { Op } from 'sequelize';

import IParkingSpaceRepository from '../interfaces/IRepositories/IParkingSpaceRepository';
import ParkingSpace from '../models/ParkingSpace';
import { TransactionType } from "../../commons/enums/transactionType";

@injectable()
class ParkingSpaceRepository implements IParkingSpaceRepository {

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingSpace} parkingSpace
   * @returns
   * @memberof ParkingSpaceRepository
   */
  Save(parkingSpace: ParkingSpace) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      parkingSpace.status = TransactionType.ACTIVE;
      ParkingSpace.create(parkingSpace, { transaction: _transaction })
        .then(async (createParkingSpace: ParkingSpace) => {
          await _transaction.commit();
          resolve({ "parkingSpaceId": createParkingSpace.id });
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceRepository
   */
  Update(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      ParkingSpace.update(parkingSpace.ToModify(),
        {
          where:
          {
            id: parkingSpace.id
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
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof ParkingSpaceRepository
   */
  Delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingSpace.sequelize.transaction();
      ParkingSpace.update({
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
          await _transaction.commit();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @returns {Promise<ParkingSpace>}
   * @memberof ParkingSpaceRepository
   */
  GetById(id: number): Promise<ParkingSpace> {
    return new Promise((resolve, reject) => {
      ParkingSpace.findByPk(id)
        .then((parkingSpace: ParkingSpace) => {
          resolve(parkingSpace)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceRepository
   */
  ToList(): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      ParkingSpace.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingSpace[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default ParkingSpaceRepository;