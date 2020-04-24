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
   * @param {*} entity
   * @returns
   * @memberof AuthService
   */
  CreateToken(entity: any) {
    return new Promise((resolve, reject) => {
      const id = entity.id;
      const name = entity.name;

      // Geração do Token de acesso
      const token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });

      // objeto Json
      const result = {
        "token": token,
        "name": entity.name,
        "email": entity.email,
      }
      resolve(result);
    });
  }
}

export default AuthService;