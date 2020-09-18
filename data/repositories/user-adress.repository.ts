import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IUserAdressRepository } from '../interfaces/IRepositories/user-adressRepository.interface';
import { UserAdress } from '../models/user-adress.model';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class UserAdressRepository implements IUserAdressRepository {

  getById(id: number): Promise<UserAdress> {
    return new Promise((resolve, reject) => {
      UserAdress.findByPk(id)
        .then((parking: UserAdress) => resolve(parking))
        .catch(error => reject(error));
    });
  }

  getByUserId(_userId: number): Promise<UserAdress> {
    return new Promise(async (resolve, reject) => {
      UserAdress.findOne(
        {
          where: {
            userId: _userId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((userAdress: UserAdress) => resolve(userAdress))
        .catch(error => reject(error));
    });
  }

  update(userAdress: UserAdress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAdress.sequelize.transaction();
      UserAdress.update(userAdress.ToModify(),
        {
          where:
          {
            id: userAdress.userId
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
      const _transaction = await UserAdress.sequelize.transaction();
      UserAdress.destroy({
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

  save(userAdress: UserAdress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAdress.sequelize.transaction();
      userAdress.status = TransactionType.ACTIVE;
      UserAdress.create(userAdress, { transaction: _transaction })
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