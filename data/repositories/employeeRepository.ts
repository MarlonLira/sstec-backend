import { Op, Sequelize } from 'sequelize';

import IEmployeeRepository from '../interfaces/IRepositories/IEmployeeRepository';
import Employee from '../models/employee';
import Querying from '../../commons/core/querying'
import { injectable } from "inversify";
import Attributes from '../../commons/core/attributes';
import { CryptoType } from '../../commons/enums/cryptoType';
import Crypto from '../../commons/core/crypto';
import Company from '../models/company';
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
  Save(employee: Employee) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Employee.sequelize.transaction();
      employee.password = Crypto.Encrypt(employee.password, CryptoType.PASSWORD);
      employee.status = TransactionType.ACTIVE;
      Employee.create(employee, { transaction: _transaction })
        .then(async (createdEmployee: Employee) => {
          await _transaction.commit();
          resolve({
            "CompanyId": createdEmployee.companyId,
            "EmployeeId": createdEmployee.id
          })
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
   * @param {Employee} employee
   * @param {string[]} properties
   * @memberof EmployeeRepository
   */
  Find(employee: Employee, properties: string[]) {
    return new Promise((resolve, reject) => {
      let query: any;
      query = Querying.ReturnOrQuery(employee, properties);
      Employee.findOne({
        where: query
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
   * @param {string} employeeName
   * @memberof EmployeeRepository
   */
  GetByName(employeeName: string) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {string} registryCode
   * @memberof EmployeeRepository
   */
  GetByRegistryCode(registryCode: string) {
    return new Promise((resolve, reject) => {
      Employee.findOne({
        where: {
          registryCode: registryCode
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
   * @memberof EmployeeRepository
   */
  ToList() {
    throw new Error("Method not implemented.");
  }

  Delete(id: number) {
    throw new Error("Method not implemented.");
  }
}

export default EmployeeRepository;