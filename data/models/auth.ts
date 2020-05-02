import User from './user';
import Employee from './employee';
import Attributes from '../../commons/core/attributes';
import Company from './company';

/**
 * @description
 * @author Marlon Lira
 * @class Auth
 */
class Auth {

  token!: string;
  validated!: boolean;
  user!: User;
  employee!: Employee;
  company!: Company;

  /**
   * Creates an instance of Auth.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof Auth
   */
  constructor(json?: any) {
    this.token = Attributes.ReturnIfValid(json.token);
    this.validated = Attributes.ReturnIfValid(json.validated);
    this.user = Attributes.IsValid(json.user) ? new User(json.user) : undefined;
    this.employee = Attributes.IsValid(json.employee) ? new Employee(json.employee) : undefined;
    this.company = Attributes.IsValid(json.company) ? new Company(json.company) : undefined;
  }
}

export default Auth;