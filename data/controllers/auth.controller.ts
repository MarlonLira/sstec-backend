import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';

import { IAuthService } from '../interfaces/IServices/authService.interface';
import Auth from "../models/auth.model";
import Http from '../../commons/core/http';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { HttpCode } from '../../commons/enums/httpCode';

/**
 * @description
 * @author Marlon Lira
 * @class AuthController
 */
@controller('/auth')
class AuthController {

  /**
   * Creates an instance of AuthController.
   * @author Marlon Lira
   * @param {IAuthService} service
   * @memberof AuthController
   */
  constructor(
    @inject(TYPES.IAuthService) private service: IAuthService,
  ) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof AuthController
   */
  @httpPost('/token-validate')
  tokenValidate(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.checkToken(new Auth(req.body)).
        then((result: any) => resolve(Http.SendSimpleMessage(res, HttpCode.Ok, { valid: !result })));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof AuthController
   */
  @httpPost('/employee/account-recovery')
  accountRecoveryEmployee(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.accountRecoveryEmployee(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, `${HttpMessage.Email_Account_Recovery} ${result}` as HttpMessage, 'Account', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Account Recovery')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof AuthController
   */
  @httpPost('/employee/signin')
  signinEmployee(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.signinEmployee(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'Login', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Login')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof AuthController
   */
  @httpPost('/user/signin')
  signinUser(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.signinUser(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'Login', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Login')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof AuthController
   */
  @httpPost('/employee/signup')
  signUp(@request() req: Request, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.signupCompany(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Login', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Login')));
    });
  }
}

export default AuthController;