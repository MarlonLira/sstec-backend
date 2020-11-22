import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IParkingAddressRepository } from '../interfaces/IRepositories/parking-addressRepository.interface';
import { ParkingAddress, ParkingAddressDAO } from '../models/parking-address.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class ParkingAddressRepository implements IParkingAddressRepository {

  getByParkingId(parkingId: number): Promise<ParkingAddress> {
    return new Promise((resolve, reject) => {
      ParkingAddressDAO.findOne({
        where: {
          parkingId: { [Op.eq]: parkingId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(new ParkingAddress(result)))
        .catch((error: any) => reject(error));
    });
  }

  update(parkingAddress: ParkingAddress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAddressDAO.sequelize.transaction();
      ParkingAddressDAO.update(parkingAddress,
        {
          where: {
            id: { [Op.eq]: parkingAddress.id }
          },
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

  save(parkingAddress: ParkingAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAddressDAO.sequelize.transaction();
      parkingAddress.status = TransactionType.ACTIVE;
      ParkingAddressDAO.create(parkingAddress, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(new ParkingAddress(result))
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAddressDAO.sequelize.transaction();
      ParkingAddressDAO.destroy({
        where: {
          id: { [Op.eq]: _id }
        },
        transaction: _transaction
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

  getById(parkingAddressId: number): Promise<ParkingAddress> {
    return new Promise((resolve, reject) => {
      ParkingAddressDAO.findOne({
        where: {
          id: { [Op.eq]: parkingAddressId },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(new ParkingAddress(result)))
        .catch((error: any) => reject(error));
    });
  }

  toList(): Promise<ParkingAddress[]> {
    return new Promise((resolve, reject) => {
      ParkingAddressDAO.findAll()
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}