import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { IAuthService } from '../interfaces/IServices/authService.interface';
import { Auth } from "../models/auth.model";
import Http from '../../commons/core/http';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { HttpCode } from '../../commons/enums/httpCode';

@controller('/auth')
class AuthController {

  constructor(
    @inject(TYPES.IAuthService) private service: IAuthService
  ) { }

  @httpPost('/token-validate')
  tokenValidate(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.checkToken(req.body.authorization).
        then((result: any) => resolve(Http.SendSimpleMessage(res, HttpCode.Ok, result)));
    });
  }

  @httpPost('/employee/account-recovery')
  accountRecoveryEmployee(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.accountRecoveryEmployee(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, `${HttpMessage.Email_Account_Recovery} ${result}` as HttpMessage, 'Account', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Account Recovery')));
    });
  }

  @httpPost('/employee/signin')
  signinEmployee(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.signinEmployee(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'Login', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Login')));
    });
  }

  @httpPost('/user/signin')
  signinUser(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.signinUser(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'Login', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Login')));
    });
  }

  @httpPost('/employee/signup')
  signup(@request() req: Request, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.signupCompany(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Login', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Login')));
    });
  }

  @httpPost('/user/signup')
  signupUser(@request() req: Request, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.signupUser(new Auth(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Login', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Login')));
    });
  }
}

export default AuthController;