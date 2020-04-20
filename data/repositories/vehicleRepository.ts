import { Op } from 'sequelize';

import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import Vehicle from '../models/vehicle';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Marlon Lira
 * @class VehicleRepository
 * @implements {IVehicleRepository}
 */
@injectable()
class VehicleRepository implements IVehicleRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<Vehicle[]>}
   * @memberof VehicleRepository
   */
  GetById(id: number): Promise<Vehicle> {
    return new Promise((resolve, reject) => {
      Vehicle.findByPk(id)
        .then((foundVehicle: Vehicle) => {
          resolve(foundVehicle);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} userId
   * @returns {Promise<Vehicle[]>}
   * @memberof VehicleRepository
   */
  GetByUserId(_userId: number): Promise<Vehicle[]> {
    return new Promise((resolve, reject) => {
      Vehicle.findAll({
        where: {
          userId: _userId,
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((foundVehicles: Vehicle[]) => {
          resolve(foundVehicles);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Vehicle} vehicle
   * @param {User} user
   * @returns {Promise<any>}
   * @memberof VehicleRepository
   */
  Save(vehicle: Vehicle): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Vehicle.sequelize.transaction();
      vehicle.status = TransactionType.ACTIVE;
      Vehicle.create(vehicle, { transaction: _transaction })
        .then(async (_vehicle: Vehicle) => {
          await _transaction.commit();
          resolve({ "vehicleId": _vehicle.id })
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} licensePlate
   * @returns {Promise<Vehicle>}
   * @memberof VehicleRepository
   */
  GetByLicensePlate(_licensePlate: string): Promise<Vehicle> {
    return new Promise((resolve, reject) => {
      Vehicle.findOne({
        where: {
          licensePlate: _licensePlate,
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((foundVehicle: Vehicle) => {
          resolve(foundVehicle);
        }).catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Vehicle} vehicle
   * @returns {Promise<any>}
   * @memberof VehicleRepository
   */
  Update(vehicle: Vehicle): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Vehicle.sequelize.transaction();
      Vehicle.update(vehicle,
        {
          where:
          {
            id: vehicle.id
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
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof VehicleRepository
   */
  Delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Vehicle.sequelize.transaction();
      Vehicle.update({
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
          await _transaction.rollback()
          reject(error);;
        });
    });
  }
}

export default VehicleRepository;