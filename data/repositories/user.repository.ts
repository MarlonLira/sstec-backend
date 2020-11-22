import { Op } from 'sequelize';

import { IUserRepository } from '../interfaces/IRepositories/userRepository.interface';
import { User, UserDAO } from '../models/user.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { UserAddressDAO } from '../models/user-address.model';
import { VehicleDAO } from '../models/vehicle.model';

@injectable()
export class UserRepository implements IUserRepository {

  getByEmail(_email: string): Promise<User> {
    return new Promise((resolve, reject) => {
      UserDAO.findOne({
        where: {
          email: { [Op.eq]: _email },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      }).then((result: any) => resolve(new User(result)))
        .catch((error: any) => reject(error));
    });
  }

  getById(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      UserDAO.findByPk(id,
        {
          include: [
            { model: CardDAO, as: 'cards', where: { status: { [Op.ne]: TransactionType.DELETED } } },
            { model: VehicleDAO, as: 'vehicles', where: { status: { [Op.ne]: TransactionType.DELETED } } },
            { model: UserAddressDAO, as: 'address', where: { status: { [Op.ne]: TransactionType.DELETED } } }
          ]
        })
        .then((result: any) => resolve(new User(result)))
        .catch((error: any) => reject(error));
    });
  }

  update(user: User): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserDAO.sequelize.transaction();
      UserDAO.update(user, {
        where: {
          id: user.id
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

  save(user: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserDAO.sequelize.transaction();
      user.status = TransactionType.ACTIVE;
      UserDAO.create(user, { transaction: _transaction })
        .then(async (result: any) => {
          await _transaction.commit();
          resolve(result);
        }).catch(async (error: any) => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  toList(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      UserDAO.findAll({
        where: {
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByName(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      UserDAO.findAll({
        where: {
          name: { [Op.like]: `${name}%` },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  getByRegistryCode(registryCode: string): Promise<User[]> {
    return new Promise((resolve, reject) => {
      UserDAO.findAll({
        where: {
          registryCode: { [Op.like]: `${registryCode}%` },
          status: { [Op.ne]: TransactionType.DELETED }
        }
      })
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await UserDAO.sequelize.transaction();
      UserDAO.update({
        status: TransactionType.DELETED
      },
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
          reject(error);
        });
    });
  }

}