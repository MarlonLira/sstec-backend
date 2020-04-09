import { Op } from 'sequelize';

import IEmployeeRepository from '../interfaces/IRepositories/IEmployeeRepository';
import Employee from '../models/employee';
import Querying from '../../commons/core/querying';;
import { injectable } from "inversify";

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
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Employee} employee
   * @param {string[]} properties
   * @memberof EmployeeRepository
   */
  Find(employee: Employee, properties: string[]) {
    throw new Error("Method not implemented.");
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
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @memberof EmployeeRepository
   */
  ToList() {
    throw new Error("Method not implemented.");
  }
}

export default EmployeeRepository;