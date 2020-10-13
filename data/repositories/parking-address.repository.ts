import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IParkingAddressRepository } from '../interfaces/IRepositories/parking-addressRepository.interface';
import { ParkingAddress } from '../models/parking-address.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
class ParkingAddressRepository implements IParkingAddressRepository {

  getByParkingId(parkingId: number): Promise<ParkingAddress> {
    return new Promise((resolve, reject) => {
      ParkingAddress.findOne({
        where: {
          parkingId: {
            [Op.eq]: parkingId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingAddress) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  update(parkingAddress: ParkingAddress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAddress.sequelize.transaction();
      ParkingAddress.update(parkingAddress.ToAny(),
        {
          where: {
            id: parkingAddress.id
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

  save(parkingAddress: ParkingAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAddress.sequelize.transaction();
      parkingAddress.status = TransactionType.ACTIVE;
      ParkingAddress.create(parkingAddress, { transaction: _transaction })
        .then(async (createParkingAddress: ParkingAddress) => {
          await _transaction.commit();
          resolve({ "ParkingAddress": createParkingAddress.id })
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await ParkingAddress.sequelize.transaction();
      ParkingAddress.destroy({
        where: {
          id: _id
        },
        transaction: _transaction
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

  getById(parkingAddressId: number): Promise<ParkingAddress> {
    return new Promise((resolve, reject) => {
      ParkingAddress.findOne({
        where: {
          id: {
            [Op.eq]: parkingAddressId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: ParkingAddress) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  toList(): Promise<ParkingAddress[]> {
    return new Promise((resolve, reject) => {
      ParkingAddress.findAll()
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }
}

export default ParkingAddressRepository;