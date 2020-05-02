import Auth from '../../models/auth';

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
}