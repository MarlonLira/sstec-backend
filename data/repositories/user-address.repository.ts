import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IUserAddressRepository } from '../interfaces/IRepositories/user-addressRepository.interface';
import { UserAddress } from '../models/user-address.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class UserAddressRepository implements IUserAddressRepository {

  getById(id: number): Promise<UserAddress> {
    return new Promise((resolve, reject) => {
      UserAddress.findByPk(id)
        .then((parking: UserAddress) => resolve(parking))
        .catch(error => reject(error));
    });
  }

  getByUserId(_userId: number): Promise<UserAddress> {
    return new Promise(async (resolve, reject) => {
      UserAddress.findOne(
        {
          where: {
            userId: _userId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((userAddress: UserAddress) => resolve(userAddress))
        .catch(error => reject(error));
    });
  }

  update(userAddress: UserAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAddress.sequelize.transaction();
      UserAddress.update(userAddress.ToAny(),
        {
          where:
          {
            id: userAddress.userId
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
      const _transaction = await UserAddress.sequelize.transaction();
      UserAddress.destroy({
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

  save(userAddress: UserAddress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAddress.sequelize.transaction();
      userAddress.status = TransactionType.ACTIVE;
      UserAddress.create(userAddress, { transaction: _transaction })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}