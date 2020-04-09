import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import IAuthService from '../interfaces/IServices/IAuthService';
import IUserRepository from '../interfaces/IRepositories/IUserRepository';
import Auth from "../models/auth";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import Attributes from '../../commons/core/attributes';
import Crypto from '../../commons/core/crypto';
import IAuthController from "../interfaces/IControllers/IAuthController";

/**
 * @description
 * @author Marlon Lira
 * @class AuthController
 * @implements {interfaces.Controller}
 */
@controller('/auth')
class AuthController implements IAuthController {

  /**
   *Creates an instance of AuthController.
   * @author Marlon Lira
   * @param {IAuthService} _authService
   * @param {IUserRepository} _userRepository
   * @memberof AuthController
   */
  constructor(
    @inject(TYPES.IAuthService) private _authService: IAuthService,
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository
  ) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns 
   * @memberof AuthController
   */
  @httpPost('/tokenValidate')
  TokenValidate(@request() req: Request, @response() res: Response) {
    let _auth = new Auth(req.body);
    return new Promise((resolve) => {
      this._authService.TokenValidate(_auth).then(result => {
        resolve(Http.SendSimpleMessage(res, HttpCode.Ok, { valid: !result }));
      })
    })

  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  @httpPost('/tokenGeneration')
  TokenGeneration(@request() req: Request, @response() res: Response) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns 
   * @memberof AuthController
   */
  @httpPost('/signIn')
  SignIn(@request() req: Request, @response() res: Response) {
    let _auth = new Auth(req.body);
    return new Promise((resolve) => {
      this._userRepository.Find(_auth.user, ['registryCode', 'email'])
        .then(found => {
          if (Attributes.IsValid(found) && Crypto.Compare(_auth.user.password, found.password)) {
            this._authService.SignIn(_auth.user).then(result => {
              resolve(Http.SendMessage(res, HttpCode.Ok, 'Acesso bem sucedido!', AuthController, result))
            });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Unauthorized, 'A conta informada é inválida!', AuthController))
          }
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, 'Erro desconhecido, por favor reporte a equipe técnica!', AuthController))
        })
    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  @httpPost('/signUp')
  SignUp(@request() req: Request, @response() res: Response) {
    throw new Error("Method not implemented.");
  }

}

export default AuthController;