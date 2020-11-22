import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IUserAddressRepository } from '../interfaces/IRepositories/user-addressRepository.interface';
import { UserAddress, UserAddressDAO } from '../models/user-address.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class UserAddressRepository implements IUserAddressRepository {

  getById(id: number): Promise<UserAddress> {
    return new Promise((resolve, reject) => {
      UserAddressDAO.findByPk(id)
        .then((result: any) => resolve(new UserAddress(result)))
        .catch((error: any) => reject(error));
    });
  }

  getByUserId(_userId: number): Promise<UserAddress> {
    return new Promise(async (resolve, reject) => {
      UserAddressDAO.findOne(
        {
          where: {
            userId: { [Op.ne]: _userId },
            status: { [Op.ne]: TransactionType.DELETED }
          }
        }
      )
        .then((result: any) => resolve(new UserAddress(result)))
        .catch((error: any) => reject(error));
    });
  }

  update(userAddress: UserAddress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAddressDAO.sequelize.transaction();
      UserAddressDAO.update(userAddress,
        {
          where:
          {
            id: { [Op.eq]: userAddress.userId }
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

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAddressDAO.sequelize.transaction();
      UserAddressDAO.destroy({
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

  save(userAddress: UserAddress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAddressDAO.sequelize.transaction();
      userAddress.status = TransactionType.ACTIVE;
      UserAddressDAO.create(userAddress, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}