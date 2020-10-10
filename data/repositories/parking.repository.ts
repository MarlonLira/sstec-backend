import { Op, QueryTypes } from 'sequelize';
import { injectable } from "inversify";

import { IParkingRepository } from '../interfaces/IRepositories/parkingRepository.interface';
import { Parking } from '../models/parking.model';
import { TransactionType } from '../../commons/enums/transactionType';
import { ParkingAddress } from '../models/parking-address.model';

@injectable()
export class ParkingRepository implements IParkingRepository {

  toList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      Parking.findAll({
        include: [{ model: ParkingAddress, as: 'ParkingAddress' }]
      })
        .then((parking: Parking[]) => resolve(parking))
        .catch(error => reject(error));
    });
  }

  getById(id: number): Promise<Parking> {
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

  save(parking: Parking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      parking.status = TransactionType.ACTIVE;
      Parking.create(parking, { transaction: _transaction })
        .then(async (createParking: Parking) => {
          await _transaction.commit();
          resolve(createParking.id);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  update(parking: Parking): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Parking.sequelize.transaction();
      Parking.update(parking.ToAny(),
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

  delete(_id: number): Promise<any> {
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

  getByRegistryCode(companyId: number, registryCode: string): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      Parking.findAll({
        where: {
          registryCode: {
            [Op.eq]: registryCode
          },
          companyId: {
            [Op.eq]: companyId
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

  getByEmployeeId(_employeeId: number): Promise<Parking[]> {
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

  getByCompanyId(_companyId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      Parking.findAll({
        include: [{ model: ParkingAddress, as: 'address' }],
        where: {
          companyId: {
            [Op.eq]: _companyId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        },
        raw: true,
        nest: true
      })
        .then((result: Parking[]) => resolve(result))
        .catch(error => reject(error));
    });
  }
}