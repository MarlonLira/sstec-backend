import IAuthService from "../interfaces/IServices/IAuthService";
import { injectable } from "inversify";
import * as jwt from 'jsonwebtoken';
import Auth from '../models/auth';

/**
 * @description
 * @author Marlon Lira
 * @class AuthService
 * @implements {IAuthService}
 */
@injectable()
class AuthService implements IAuthService {

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns 
   * @memberof AuthService
   */
  CheckToken(auth: Auth) {
    return new Promise((resolve) => {
      jwt.verify(auth.token, process.env.SECRET, (err) => {
        resolve(err);
      });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<Auth>}
   * @memberof AuthService
   */
  CreateEmployeeToken(auth: Auth): Promise<Auth> {
    return new Promise((resolve) => {
      const id = auth.employee.id;
      const name = auth.employee.name;

      auth.token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });
      auth.validated = true;

      resolve(auth);
    });
  }
}

export default AuthService;