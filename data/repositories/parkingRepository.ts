import { Op, QueryTypes } from 'sequelize';
import { injectable } from "inversify";

import IParkingRepository from '../interfaces/IRepositories/IParkingRepository';
import Parking from '../models/parking';
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
  Save(parking: Parking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      parking.status = TransactionType.ACTIVE;
      Parking.create(parking, { transaction: _transaction })
        .then(async (createParking: Parking) => {
          await _transaction.commit();
          resolve({ "parkingId": createParking.id });
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
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof ParkingRepository
   */
  Delete(_id: number): Promise<any> {
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
   * @param {string} registryCode
   * @returns {Promise<Parking>}
   * @memberof ParkingRepository
   */
  GetByRegistryCode(registryCode: string): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      Parking.findAll({
        where: {
          registryCode: {
            [Op.eq]: registryCode
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: Parking[]) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _employeeId
   * @returns {Promise<Parking>}
   * @memberof ParkingRepository
   */
  GetByEmployeeId(_employeeId: number): Promise<Parking[]> {
    return new Promise(async (resolve, reject) => {
      Parking.sequelize.query(
        "   SELECT P.* FROM Parking AS P" +
        "   INNER JOIN Employee AS E" +
        "     ON E.PARKINGID = P.id" +
        "     WHERE E.STATUS = 'AT'" +
        "     AND P.status = 'AT'" +
        "     AND E.id = :employeeId",
        {
          replacements: {
            employeeId: _employeeId,
          },
          type: QueryTypes.SELECT,
          mapToModel: true
        }
      )
        .then((result: Parking[]) => {
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
   * @returns {Promise<Parking[]>}
   * @memberof ParkingRepository
   */
  ToList(_companyId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      Parking.findAll({
        where: {
          companyId: {
            [Op.eq]: _companyId
          },
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