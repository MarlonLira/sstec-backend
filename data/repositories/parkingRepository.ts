import { Op } from 'sequelize';
import { injectable } from "inversify";

import IParkingRepository from '../interfaces/IRepositories/IParkingRepository';
import Parking from '../models/Parking';
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Emerson Souza
 * @class ParkingRepository
 * @implements {IParkingRepository}
 */
@injectable()
class ParkingRepository implements IParkingRepository {

  GetById(id: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      Parking.findByPk(id)
        .then((parking: Parking) => {
          resolve(parking)
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @memberof ParkingRepository
   */
  Save(parking: Parking) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      parking.status = TransactionType.ACTIVE;
      Parking.create(parking, { transaction: _transaction })
        .then((createParking: Parking) => {
          _transaction.commit();
          resolve({ "parkingId": createParking.id });
        }).catch(error => {
          _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @memberof ParkingRepository
   */
  Update(parking: Parking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      Parking.update(parking.ToModify(),
        {
          where:
          {
            id: parking.id
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
   * @memberof ParkingRepository
   */
  Delete(_id: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      Parking.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
          },
          transaction: _transaction,
          validate: false
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {string} registryCode
   * @memberof ParkingRepository
   */
  GetByRegistryCode(registryCode: string): Promise<Parking> {
    return new Promise((resolve) => {
      Parking.findOne({
        where: {
          registryCode: {
            [Op.eq]: registryCode
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then(result => {
          resolve(result);

        })
        .catch(error => {
          throw error;
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @memberof ParkingRepository
   */
  ToList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      Parking.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: Parking[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default ParkingRepository;