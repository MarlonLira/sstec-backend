import { Op } from 'sequelize';
import { injectable } from "inversify";

import { IEmployeeRepository } from '../interfaces/IRepositories/employeeRepository.interface';
import { Employee } from '../models/employee.model';
import { CryptoType } from '../../commons/enums/cryptoType';
import Crypto from '../../commons/core/crypto';
import { TransactionType } from '../../commons/enums/transactionType';

@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private _attributes = ['id', 'status', 'name', 'registryCode', 'phone', 'email', 'about', 'imageUrl', 'parkingId', 'companyId', 'ruleId']

  save(employee: Employee): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Employee.sequelize.transaction();
      employee.password = Crypto.Encrypt(employee.password, CryptoType.PASSWORD);
      employee.status = TransactionType.ACTIVE;
      Employee.create(employee, { transaction: _transaction })
        .then(async (result: Employee) => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  getByName(name: string, _parkingId: number = 0, _companyId: number = 0): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      Employee.findAll({
        attributes: this._attributes,
        where: {
          name: {
            [Op.like]: `%${name}%`
          },
          [Op.or]: [{ parkingId: _parkingId }, { companyId: _companyId }],
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getByRegistryCode(_registryCode: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      Employee.findOne({
        attributes: this._attributes,
        where: {
          registryCode: {
            [Op.eq]: _registryCode
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: Employee) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getByEmail(_email: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      Employee.findOne({
        where: {
          email: {
            [Op.eq]: _email
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: Employee) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

  getByCompanyId(_companyId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      Employee.findAll({
        attributes: this._attributes,
        where: {
          companyId: {
            [Op.eq]: _companyId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: Employee[]) => resolve(result)
      ).catch(error => reject(error));
    });
  }

  getById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      Employee.findByPk(id)
        .then((result: Employee) => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
    });
  }

  getByParkingId(_parkingId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      Employee.findAll({
        attributes: this._attributes,
        where: {
          parkingId: {
            [Op.eq]: _parkingId
          },
          status: {
            [Op.ne]: TransactionType.DELETED
          }
        }
      }).then((result: Employee[]) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

  update(employee: Employee): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Employee.sequelize.transaction();
      Employee.update(employee.ToModify(),
        {
          where:
          {
            id: employee.id
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
      const _transaction = await Employee.sequelize.transaction();
      Employee.update({
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
