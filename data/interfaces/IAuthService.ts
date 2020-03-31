import { Auth } from '../models/auth';
import { User } from '../models/User';

export default interface IAuthService {
  TokenValidate(auth: Auth);
  TokenGeneration(auth: Auth);
  SignIn(user: User);
  SignUp(user: User);
}