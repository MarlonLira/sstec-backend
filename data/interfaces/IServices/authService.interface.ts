import { Auth } from '../../models/auth.model';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IAuthService
 */
export interface IAuthService {

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof IAuthService
   */
  checkToken(auth: Auth): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof IAuthService
   */
  accountRecoveryEmployee(auth: Auth): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<Auth>}
   * @memberof IAuthService
   */
  createEmployeeToken(auth: Auth): Promise<Auth>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<Auth>}
   * @memberof IAuthService
   */
  createUserToken(auth: Auth): Promise<Auth>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof IAuthService
   */
  signinEmployee(auth: Auth): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof IAuthService
   */
  signinUser(auth: Auth): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof IAuthService
   */
  signupCompany(auth: Auth): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof IAuthService
   */
  signupUser(auth: Auth): Promise<any>;
}