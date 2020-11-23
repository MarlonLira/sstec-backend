import { Auth } from '../../models/auth.model';

export interface IAuthService {
  checkToken(token: string): Promise<any>;
  accountRecoveryEmployee(auth: Auth): Promise<any>;
  signinEmployee(auth: Auth): Promise<any>;
  signinUser(auth: Auth): Promise<any>;
  signupCompany(auth: Auth): Promise<any>;
  signupUser(auth: Auth): Promise<any>;
}