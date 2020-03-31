import IAuthService from "../interfaces/IAuthService";
import { User } from '../models/User';
import { Auth } from '../models/auth';

import { injectable } from "inversify";

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
  TokenValidate(auth: Auth) {
    return new Promise((resolve, reject) => {
      jwt.verify(auth.token, process.env.SECRET, (err, decoded) => {
        resolve(err)
      })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @memberof AuthService
   */
  TokenGeneration(auth: Auth) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {User} user
   * @returns 
   * @memberof AuthService
   */
  SignIn(user: User) {
    return new Promise((resolve, reject) => {
      let id = user.id;
      let name = user.name;

      //Geração do Token de acesso
      const token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });

      //objeto Json
      let result = {
        "token": token,
        "name": user.name,
        "email": user.email,
      }
      resolve(result);
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {User} user
   * @memberof AuthService
   */
  SignUp(user: User) {
    throw new Error("Method not implemented.");
  }

}

export default AuthService;