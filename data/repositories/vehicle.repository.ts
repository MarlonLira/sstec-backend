import { Op } from 'sequelize';

import IVehicleRepository from '../interfaces/IRepositories/vehicleRepository.interface';
import Vehicle from '../models/vehicle.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
class VehicleRepository implements IVehicleRepository {

  getById(id: number): Promise<Vehicle> {
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

  getByUserId(_userId: number): Promise<Vehicle[]> {
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

  save(vehicle: Vehicle): Promise<any> {
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

  getByLicensePlate(_licensePlate: string): Promise<Vehicle> {
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

  update(vehicle: Vehicle): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Vehicle.sequelize.transaction();
      Vehicle.update(vehicle.ToAny(),
        {
          where: {
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

  delete(_id: number): Promise<any> {
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