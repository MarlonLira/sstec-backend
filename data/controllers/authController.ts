import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import IAuthService from '../interfaces/IServices/IAuthService';
import Auth from "../models/auth";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import Attributes from '../../commons/core/attributes';
import Crypto from '../../commons/core/crypto';
import IAuthController from "../interfaces/IControllers/IAuthController";
import IEmployeeRepository from "../interfaces/IRepositories/IEmployeeRepository";
import Employee from "../models/employee";
import ICompanyRepository from "../interfaces/IRepositories/ICompanyRepository";
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Marlon Lira
 * @class AuthController
 * @implements {interfaces.Controller}
 */
@controller('/auth')
class AuthController implements IAuthController {

  /**
   * Creates an instance of AuthController.
   * @author Marlon Lira
   * @param {IAuthService} _authService
   * @param {IUserRepository} _userRepository
   * @memberof AuthController
   */
  constructor(
    @inject(TYPES.IAuthService) private _authService: IAuthService,
    @inject(TYPES.IEmployeeRepository) private _employeeRepository: IEmployeeRepository,
    @inject(TYPES.ICompanyRepository) private _companyRepository: ICompanyRepository,
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
    const _auth = new Auth(req.body);
    return new Promise((resolve) => {
      this._authService.CheckToken(_auth).then((result: any) => {
        resolve(Http.SendSimpleMessage(res, HttpCode.Ok, { valid: !result }));
      });
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
  @httpPost('/employee/signIn')
  SignIn(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _auth = new Auth(req.body);
      this._employeeRepository.GetByRegistryCode(_auth.employee.registryCode)
        .then((found: Employee) => {
          if (Attributes.IsValid(found) && Crypto.Compare(_auth.employee.password, found.password)) {
            this._authService.CreateToken(found)
              .then((result: any) => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'Login', result));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Unauthorized, HttpMessage.Login_Unauthorized, 'Login'));
          }
        })
        .catch((error: any) => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Login', error));
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  @httpPost('/employee/signUp')
  SignUp(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _auth = new Auth(req.body);
      this._companyRepository.GetByRegistryCode(_auth.company.registryCode)
        .then((result: any) => {
          if (!Attributes.IsValid(result)) {
            this._companyRepository.Save(_auth.company)
              .then((createdCompany: { id: number; }) => {
                _auth.employee.companyId = createdCompany.id;
                this._employeeRepository.Save(_auth.employee)
                  .then((_result: any) => {
                    resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Account_Created, 'Login', _result));
                  })
                  .catch((error: any) => {
                    resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Login', error));
                  });
              }).catch((error: any) => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Login', error));
              })
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Login'));
          }
        });
    });
  }
}

export default AuthController;