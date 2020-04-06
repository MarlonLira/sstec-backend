import Auth from '../../models/auth';
import User from '../../models/user';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IAuthService
 */
export default interface IAuthService {
  TokenValidate(auth: Auth);
  TokenGeneration(auth: Auth);
  SignIn(user: User);
  SignUp(user: User);
}