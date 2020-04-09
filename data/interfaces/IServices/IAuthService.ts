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
  TokenValidate(auth: Auth);
  TokenGeneration(auth: Auth);
  SignIn(entity: any, authType: AuthType);
  SignUp(user: User);
}