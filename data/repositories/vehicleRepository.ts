import { Op } from 'sequelize';

import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import Vehicle from '../models/vehicle';
import { Querying } from '../../commons/helpers';
import { injectable } from "inversify";
import User from '../models/user';
import Logger from '../../commons/logger';
import { resolve } from 'dns';

/**
 * @description
 * @author Marlon Lira
 * @class VehicleRepository
 * @implements {IVehicleRepository}
 */
@injectable()
class VehicleRepository implements IVehicleRepository {

  Save(vehicle: Vehicle) {
    return new Promise((resolve, reject) => {
      User.findByPk(2).then((user: User) => {
        Vehicle.findByPk(2)
          .then((vehicle: Vehicle) => {
            user.addVehicles(vehicle).then(result => resolve(result));
          }).catch(error => {
            throw error;
          })
      })

    })
  }
  Find(vehicle: Vehicle, properties: string[]) {
    throw new Error("Method not implemented.");
  }

}

export default VehicleRepository;