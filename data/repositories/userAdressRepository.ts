import IUserAdressRepository from '../interfaces/IRepositories/IUserAdressRepository';
import User from '../models/user';
import UserAdress from '../models/userAdress';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { Op } from 'sequelize';
import { cpus } from 'os';

/**
 * @description
 * @author Gustavo Gusmão
 * @class UserAdressRepository
 * @implements {IUserAdressRepository}
 */
@injectable()
class UserAdressRepository implements IUserAdressRepository {
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _userId
   * @returns {Promise<UserAdress[]>}
   * @memberof UserAdressRepository
   */
  GetByUserId(_userId: number): Promise<UserAdress[]> {
    return new Promise(async (resolve, reject) => {
      UserAdress.findAll(
        {
          where: {
            userId: _userId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((foundUserAdress: UserAdress[]) => {
          resolve(foundUserAdress);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {user} user
   * @memberof UserAdressRepository
   */
  Update(_userAdress: UserAdress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAdress.sequelize.transaction();
      UserAdress.update(_userAdress.ToModify(),
        {
          where:
          {
            id: _userAdress.userId
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @memberof UserAdressRepository
   */
  Delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserAdress.sequelize.transaction();
      UserAdress.update({
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
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {UserAdress} userAdress
   * @returns
   * @memberof UserAdressRepository
   */
  Save(userAdress: UserAdress) {
    return new Promise((resolve, reject) => {
      userAdress.status = TransactionType.ACTIVE;
      UserAdress.create(userAdress)
        .then(result => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
    });
  }
}

export default UserAdressRepository;