import Email from '../../models/email';
/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IEmailService
 */
export default interface IEmailService {

  /**
   * @description
   * @author Marlon Lira
   * @param {Email} email
   * @returns {Promise<any>}
   * @memberof IEmailService
   */
  Send(email: Email): Promise<any>;

}