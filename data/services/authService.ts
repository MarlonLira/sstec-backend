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
  TokenValidate(auth: Auth) {
    return new Promise((resolve) => {
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

  private SignInUser(user: User) {
    return new Promise((resolve) => {
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

  async SignIn(entity: any, authType: AuthType) {
    switch (authType) {
      case AuthType.USER:
        return await this.SignInUser(entity);
      case AuthType.EMPLOYEE:
        return await this.SignInEmployee(entity);
      default: throw ('error');
    }
  }

  private SignInEmployee(employee: Employee) {
    return new Promise((resolve) => {
      let id = employee.id;
      let name = employee.name;

      //Geração do Token de acesso
      const token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });

      //objeto Json
      let result = {
        "token": token,
        "name": employee.name,
        "email": employee.email,
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