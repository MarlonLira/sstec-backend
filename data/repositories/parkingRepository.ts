import { Op } from 'sequelize';
import { injectable } from "inversify";

import IParkingRepository from '../interfaces/IRepositories/IParkingRepository';
import Parking from '../models/Parking';
import Company from '../models/company';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Emerson Souza
 * @class ParkingRepository
 * @implements {IParkingRepository}
 */
@injectable()
class ParkingRepository implements IParkingRepository {

  /**
  * @description
  * @author Emerson Souza
  * @param {Parking} parking
  * @memberof ParkingRepository
  */

  Save(parking: Parking, companyId: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      Company.findByPk(companyId)
        .then((company: Company) => {
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
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @memberof ParkingRepository
   */
  Update(parking: Parking) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      Parking.findByPk(parking.id)
        .then((result: Parking) => {
          if (!Attributes.IsValid(result)) {
            reject('Cliente não encontrado!');
          }
          Parking.update({
            status: Attributes.ReturnIfValid(parking.status, result.status),
            name: Attributes.ReturnIfValid(parking.name, result.name),
            registryCode: Attributes.ReturnIfValid(parking.registryCode, result.registryCode),
            phone: Attributes.ReturnIfValid(parking.phone, result.phone),
            email: Attributes.ReturnIfValid(parking.email, result.email),
            amount: Attributes.ReturnIfValid(parking.amount, result.amount),
            imgUrl: Attributes.ReturnIfValid(parking.imgUrl, result.imgUrl)
          },
            {
              where: {
                id: parking.id
              },
              transaction: _transaction
            })
            .then(result => {
              _transaction.commit();
              resolve(result);
            })
            .catch(error => {
              _transaction.rollback();
              reject(error);
            });
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {number} id
   * @memberof ParkingRepository
   */
  Delete(id: number) {
    return new Promise((resolve,reject) => {
      Parking.findByPk(id)
        .then((result: Parking) => {

          if (!Attributes.IsValid(result)) {
            reject('Cliente não encontrado!');
          }
          Parking.update({
            status: 'EX',
            name: Attributes.ReturnIfValid(result.name),
            registryCode: Attributes.ReturnIfValid(result.registryCode),
            phone: Attributes.ReturnIfValid(result.phone),
            email: Attributes.ReturnIfValid(result.email),
            amount: Attributes.ReturnIfValid(result.amount),
            imgUrl: Attributes.ReturnIfValid(result.imgUrl)
          },
            {
              where: {
                id: id
              }
            })
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              reject(error);
            })
        })
    })
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Parking} parking
   * @param {string[]} properties
   * @memberof ParkingRepository
   */
  Find(parking: Parking, properties: string[]) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {string} parkingName
   * @memberof ParkingRepository
   */
  //GetByName(parkingName: string) {
  //  throw new Error("Method not implemented.");
  //}

  /**
   * @description
   * @author Emerson Souza
   * @param {string} registryCode
   * @memberof ParkingRepository
   */
  GetByRegistryCode(registryCode: string) {
    return new Promise((resolve) => {
      Parking.findOne({
        where: {
          registryCode: {
            [Op.eq]: registryCode
          }
        }
      })
        .then(result => {
          resolve(result);

        })
        .catch(error => {
          throw error;
        })
    })
  }


  /**
   * @description
   * @author Emerson Souza
   * @memberof ParkingRepository
   */
  ToList() {
    throw new Error("Method not implemented.");
  }
}

export default ParkingRepository;