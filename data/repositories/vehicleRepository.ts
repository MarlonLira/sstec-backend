import { Op } from 'sequelize';

import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import Vehicle from '../models/vehicle';
import Querying from '../../commons/core/querying';;
import { injectable } from "inversify";
import User from '../models/user';
import Logger from '../../commons/core/logger';
import { resolve } from 'dns';

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
    return new Promise((resolve) => {
      User.findByPk(userId)
        .then((user: User) => {
          Vehicle.create({
            status: 'AT',
            model: vehicle.model,
            color: vehicle.color,
            type: vehicle.type,
            licensePlate: vehicle.licensePlate
          }).then((vehicle: Vehicle) => {
            user.addVehicle(vehicle)
              .then(result => resolve(result));
          }).catch(error => {
            throw error;
          })
        })
    })
  }

  Find(licensePlate: string, userId: number) {
    return new Promise((resolve) => {
      let count: number = 1;
      User.findByPk(userId)
        .then((user: User) => {
          user.getVehicles()
            .then((vehicles: Vehicle[]) => {
              vehicles.forEach((vehicle: Vehicle) => {
                if (vehicle.licensePlate == licensePlate) {
                  resolve(vehicle);
                } else if (vehicles.length == count) {
                  resolve(undefined);
                }
                count++;
              });
            })
            .catch(error => { throw error; })
        });
    })
  }

  GetVehicles(userId: number) {
    return new Promise((resolve) => {
      User.findByPk(userId)
        .then((user: User) => {
          user.getVehicles()
            .then((vehicles: Vehicle[]) => {
              resolve(vehicles);
            })
            .catch(error => {
              throw error;
            })
        });
    });
  }


}

export default VehicleRepository;