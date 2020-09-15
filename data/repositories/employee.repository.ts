import { Op } from 'sequelize';
import { injectable } from "inversify";

import IEmployeeRepository from '../interfaces/IRepositories/employeeRepository.interface';
import Employee from '../models/employee.model';
import { CryptoType } from '../../commons/enums/cryptoType';
import Crypto from '../../commons/core/crypto';

import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Marlon Lira
 * @class EmployeeRepository
 * @implements {IEmployeeRepository}
 */
@injectable()
class EmployeeRepository implements IEmployeeRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {Employee} employee
   * @memberof EmployeeRepository
   */
  Save(employee: Employee): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Employee.sequelize.transaction();
      employee.password = Crypto.Encrypt(employee.password, CryptoType.PASSWORD);
      employee.status = TransactionType.ACTIVE;
      Employee.create(employee, { transaction: _transaction })
        .then(async (createdEmployee: Employee) => {
          await _transaction.commit();
          resolve(createdEmployee);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} employeeName
   * @memberof EmployeeRepository
   */
  GetByName(name: string, _parkingId: number = 0, _companyId: number = 0): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      Employee.findAll({
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

  /**
   * @description
   * @author Marlon Lira
   * @param {string} registryCode
   * @memberof EmployeeRepository
   */
  GetByRegistryCode(_registryCode: string): Promise<Employee> {
    return new Promise((resolve, reject) => {
      Employee.findOne({
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

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _email
   * @returns {Promise<Employee>}
   * @memberof EmployeeRepository
   */
  GetByEmail(_email: string): Promise<Employee> {
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _companyId
   * @returns {Promise<Employee[]>}
   * @memberof EmployeeRepository
   */
  GetByCompanyId(_companyId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      Employee.findAll({
        where: {
          companyId: {
            [Op.eq]: _companyId
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

  GetById(id: number): Promise<Employee> {
    return new Promise((resolve, reject) => {
      Employee.findByPk(id)
      .then((result: Employee) => {
        resolve(result);
      }).catch(error => {
        reject(error);
      });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _parkingId
   * @returns {Promise<Employee[]>}
   * @memberof EmployeeRepository
   */
  GetByParkingId(_parkingId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      Employee.findAll({
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

  /**
   * @description
   * @author Marlon Lira
   * @memberof EmployeeRepository
   */
  ToList(companyId: number): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      Employee.findAll({
        where: {
          status: {
            [Op.ne]: TransactionType.DELETED
          },
          companyId:{
            [Op.eq]: companyId
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

  Update(employee: Employee): Promise<any> {
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

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @memberof EmployeeRepository
   */
  Delete(_id: number): Promise<any> {
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

export default EmployeeRepository;