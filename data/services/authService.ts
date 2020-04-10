import IAuthService from "../interfaces/IServices/IAuthService";
import User from '../models/user';
import Auth from '../models/auth';

import { injectable } from "inversify";
import Employee from "../models/employee";
import { AuthType } from "../../commons/enums/authType";

const jwt = require('jsonwebtoken')

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
      jwt.verify(auth.token, process.env.SECRET, (err, decoded) => {
        resolve(err)
      })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {*} entity
   * @returns 
   * @memberof AuthService
   */
  CreateToken(entity: any) {
    return new Promise((resolve) => {
      let id = entity.id;
      let name = entity.name;

      //Geração do Token de acesso
      const token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });

      //objeto Json
      let result = {
        "token": token,
        "name": entity.name,
        "email": entity.email,
      }
      resolve(result);
    })
  }
}

export default AuthService;