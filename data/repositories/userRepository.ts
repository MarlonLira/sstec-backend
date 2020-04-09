import { Op } from 'sequelize';

import IUserRepository from '../interfaces/IRepositories/IUserRepository';
import User from '../models/user';
import Querying from '../../commons/core/querying';;
import { injectable } from "inversify";

/**
 * @description
 * @author Marlon Lira
 * @class UserRepository
 * @implements {IUserRepository}
 */
@injectable()
class UserRepository implements IUserRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {User} user
   * @param {string[]} properties
   * @returns 
   * @memberof UserRepository
   */
  Find(user: User, properties: string[]) {
    return new Promise((resolve) => {
      let query: any;
      query = Querying.ReturnOrQuery(user, properties);
      User.findAll({
        where: query
      }).then(result => {
        resolve(result);
      }).catch(error => {
        throw (error);
      })
    });
  }

  Update(user: User) {
    User.update(user, {
      where : {
        id:  1
      }
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {User} user
   * @returns 
   * @memberof UserRepository
   */
  Save(user: any) {
    return new Promise((resolve) => {
      User.create({
        name: user.name,
        registryCode: user.registryCode,
        phone: user.phone,
        email: user.email,
        status: 'AT',
        password: user.password
      }).then(result => {
        resolve(result);
      }).catch(error => {
        throw (error);
      })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @returns 
   * @memberof UserRepository
   */
  ToList() {
    return new Promise((resolve) => {
      User.findAll()
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} userName
   * @returns {Promise}
   * @memberof UserRepository
   */
  GetByName(userName: string) {
    return new Promise((resolve) => {
      User.findAll({
        where: {
          name: {
            [Op.like]: `${userName}%`
          }
        }
      })
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} registryCode
   * @returns 
   * @memberof UserRepository
   */
  GetByRegistryCode(registryCode: string) {
    return new Promise((resolve) => {
      User.findAll({
        where: {
          name: {
            [Op.like]: `${registryCode}%`
          }
        }
      })
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }
}

export default UserRepository;