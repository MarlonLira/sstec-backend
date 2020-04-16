import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import Vehicle from '../models/vehicle';
import Querying from '../../commons/core/querying'
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
   * @returns
   * @memberof VehicleRepository
   */
  Save(vehicle: Vehicle, userId: number) {
    return new Promise((resolve, reject) => {
      User.findByPk(userId)
        .then((user: User) => {
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
    });
  }

  Find(licensePlate: string, userId: number) {
    return new Promise((resolve, reject) => {
      let count: number = 1;
      User.findByPk(userId)
        .then((user: User) => {
          user.getVehicles()
            .then((vehicles: Vehicle[]) => {
              vehicles.forEach((vehicle: Vehicle) => {
                if (vehicle.licensePlate === licensePlate) {
                  resolve(vehicle);
                } else if (vehicles.length === count) {
                  resolve(undefined);
                }
                count++;
              });
              resolve(undefined);
            })
            .catch(error => {
              reject(error);
            });
        });
    })
  }

  GetVehicles(userId: number) {
    return new Promise((resolve, reject) => {
      User.findByPk(userId)
        .then((user: User) => {
          user.getVehicles()
            .then((vehicles: Vehicle[]) => {
              resolve(vehicles);
            })
            .catch(error => {
              throw error;
            });
        });
    });
  }
}

export default VehicleRepository;