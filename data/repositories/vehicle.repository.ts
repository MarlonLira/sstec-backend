import { Op } from 'sequelize';

import { IVehicleRepository } from '../interfaces/IRepositories/vehicleRepository.interface';
import { Vehicle, VehicleDAO } from '../models/vehicle.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class VehicleRepository implements IVehicleRepository {

  getById(id: number): Promise<Vehicle> {
    return new Promise((resolve, reject) => {
      VehicleDAO.findByPk(id)
        .then((result: any) => resolve(new Vehicle(result)))
        .catch((error: any) => reject(error));
    });
  }

  getByUserId(_userId: number): Promise<Vehicle[]> {
    return new Promise((resolve, reject) => {
      VehicleDAO.findAll({
        where: {
          userId: { [Op.eq]: _userId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  save(vehicle: Vehicle): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await VehicleDAO.sequelize.transaction();
      vehicle.status = TransactionType.ACTIVE;
      VehicleDAO.create(vehicle, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getByLicensePlate(_licensePlate: string): Promise<Vehicle> {
    return new Promise((resolve, reject) => {
      VehicleDAO.findOne({
        where: {
          licensePlate: { [Op.eq]: _licensePlate },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(new Vehicle(result)))
        .catch((error: any) => reject(error));
    });
  }

  update(vehicle: Vehicle): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await VehicleDAO.sequelize.transaction();
      VehicleDAO.update(vehicle,
        {
          where: { id: { [Op.eq]: vehicle.id } },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await VehicleDAO.sequelize.transaction();
      VehicleDAO.update({ status: TransactionType.DELETED },
        {
          where: { id: { [Op.eq]: _id } },
          transaction: _transaction,
          validate: false
        })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async (error: any) => {
          await _transaction.rollback()
          reject(error);;
        });
    });
  }
}