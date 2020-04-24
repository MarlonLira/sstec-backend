import Employee from '../../models/employee';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IEmployeeRepository
 */
interface IEmployeeRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {string} name
   * @returns {Promise<Employee[]>}
   * @memberof IEmployeeRepository
   */
  GetByName(name: string): Promise<Employee[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _registryCode
   * @returns {Promise<Employee>}
   * @memberof IEmployeeRepository
   */
  GetByRegistryCode(_registryCode: string): Promise<Employee>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _email
   * @returns {Promise<Employee>}
   * @memberof IEmployeeRepository
   */
  GetByEmail(_email: string): Promise<Employee>;

  /**
   * @description
   * @author Marlon Lira
   * @returns {Promise<Employee[]>}
   * @memberof IEmployeeRepository
   */
  ToList(): Promise<Employee[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Employee} employee
   * @returns {Promise<any>}
   * @memberof IEmployeeRepository
   */
  Save(employee : Employee) : Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Employee} employee
   * @returns {Promise<any>}
   * @memberof IEmployeeRepository
   */
  Update(employee : Employee): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof IEmployeeRepository
   */
  Delete(id: number): Promise<any>;
}

export default IEmployeeRepository;