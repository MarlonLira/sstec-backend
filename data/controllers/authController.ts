import { Response, Request } from "express";
import { interfaces, controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import IAuthService from '../interfaces/IAuthService';
import IUserRepository from '../interfaces/IUserRepository';
import AUTH_TYPES from '../types/authTypes';
import USER_TYPES from '../types/userTypes';
import { Auth } from "../models/Auth";
import { Http } from '../../commons/Http';
import { HttpCode } from '../../commons/enums/HttpCode';
import { Attributes, Crypto } from '../../commons/Helpers';

/**
 * @description
 * @author Marlon Lira
 * @class AuthController
 * @implements {interfaces.Controller}
 */
@controller('/auth')
class AuthController implements interfaces.Controller {

  /**
   * @description
   * @type {IAuthService}
   * @memberof AuthController
   */
  readonly _authService: IAuthService;
  /**
   * @description
   * @type {IUserRepository}
   * @memberof AuthController
   */
  readonly _userRepository: IUserRepository;

  /**
   *Creates an instance of AuthController.
   * @author Marlon Lira
   * @param {IAuthService} authService
   * @memberof AuthController
   */
  constructor(
    @inject(AUTH_TYPES.IAuthService) private authService: IAuthService,
    @inject(USER_TYPES.IUserRepository) private userRepository: IUserRepository
  ) {
    this._authService = authService;
    this._userRepository = userRepository;
  }

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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
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