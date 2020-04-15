import Auth from '../../models/auth';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IAuthService
 */
export default interface IAuthService {
  CheckToken(auth: Auth);
  CreateToken(entity: any);
}