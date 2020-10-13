import { Op } from 'sequelize';

import { IUserRepository } from '../interfaces/IRepositories/userRepository.interface';
import { User } from '../models/user.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class UserRepository implements IUserRepository {

  getByEmail(_email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          email: {
            [Op.eq]: _email
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: User) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      User.findByPk(id)
        .then((user: User) => {
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  update(user: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await User.sequelize.transaction();
      User.update(user.toJSON(), {
        where: {
          id: user.id
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

  save(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await User.sequelize.transaction();
      user.status = TransactionType.ACTIVE;
      User.create(user, { transaction: _transaction })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  toList(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: User[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getByName(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: {
          name: {
            [Op.like]: `${name}%`
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          reject(error);
        });
    });
  }

  getByRegistryCode(registryCode: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: {
          registryCode: {
            [Op.like]: `${registryCode}%`
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then((result: User[]) => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await User.sequelize.transaction();
      User.update({
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
          reject(error);
        });
    });
  }

}