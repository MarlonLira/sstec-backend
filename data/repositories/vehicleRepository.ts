import { Op } from 'sequelize';

import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import Vehicle from '../models/vehicle';
import { injectable } from "inversify";
import User from '../models/user';
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
   * @param {Vehicle} vehicle
   * @param {User} user
   * @returns {Promise<any>}
   * @memberof VehicleRepository
   */
  Save(vehicle: Vehicle, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      vehicle.status = TransactionType.ACTIVE;
      Vehicle.create(vehicle)
        .then((_vehicle: Vehicle) => {
          user.addVehicle(_vehicle)
            .then(result => {
              resolve(result);
            });
        }).catch(error => {
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
  GetVehicles(userId: number): Promise<Vehicle[]> {
    return new Promise((resolve, reject) => {
      User.findByPk(userId)
        .then((user: User) => {
          user.getVehicles()
            .then((vehicles: Vehicle[]) => {
              resolve(vehicles);
            })
            .catch(error => {
              reject(error);
            });
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
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof VehicleRepository
   */
  Delete(id: number, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      user.removeVehicle(id)
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default VehicleRepository;