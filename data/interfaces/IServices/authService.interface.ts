import Auth from '../../models/auth.model';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IAuthService
 */
export default interface IAuthService {

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof IAuthService
   */
  CheckToken(auth: Auth): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<Auth>}
   * @memberof IAuthService
   */
  CreateEmployeeToken(auth: Auth): Promise<Auth>;

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<Auth>}
   * @memberof IAuthService
   */
  CreateUserToken(auth: Auth): Promise<Auth>;
}