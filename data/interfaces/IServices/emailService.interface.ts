import Email from '../../models/email.model';
/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IEmailService
 */
export interface IEmailService {

  /**
   * @description
   * @author Marlon Lira
   * @param {Email} email
   * @returns {Promise<any>}
   * @memberof IEmailService
   */
  send(email: Email): Promise<any>;

}