import Auth from '../../models/auth';
import User from '../../models/user';
import { AuthType } from '../../../commons/enums/authType';

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