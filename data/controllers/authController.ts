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
import IEmployeeRepository from "../interfaces/IRepositories/IEmployeeRepository";
import Employee from "../models/employee";
import ICompanyRepository from "../interfaces/IRepositories/ICompanyRepository";
import Company from "../models/company";
import { AuthType } from "../../commons/enums/authType";

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
      this._employeeRepository.GetByRegistryCode(_auth.employee.registryCode)
        .then((found: Employee) => {
          if (Attributes.IsValid(found.password) && Crypto.Compare(_auth.employee.password, found.password)) {
            this._authService.SignIn(_auth.employee, AuthType.EMPLOYEE).then(result => {
              resolve(Http.SendMessage(res, HttpCode.Ok, 'Acesso bem sucedido!', AuthController, result))
            });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Unauthorized, 'A conta informada é inválida!', AuthController))
          }
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, 'Erro desconhecido, por favor reporte a equipe técnica!', AuthController))
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
  @httpPost('/signUp')
  SignUp(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      let _auth = new Auth(req.body);
      this._companyRepository.GetByRegistryCode(_auth.company.registryCode)
        .then(result => {
          if (!Attributes.IsValid(result)) {
            this._companyRepository.Save(_auth.company)
              .then((companyId: number) => {
                _auth.employee.companyId = companyId;
                this._employeeRepository.Save(_auth.employee)
                  .then(employeeId => {
                    resolve(Http.SendMessage(res, HttpCode.Ok, 'Acesso bem sucedido!', AuthController, { "companyId": companyId, "employeeId": employeeId }));
                  })
                  .catch(error => {
                    resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, 'Erro desconhecido, por favor reporte a equipe técnica!', AuthController));
                  });
              }).catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, 'Erro desconhecido, por favor reporte a equipe técnica!', AuthController));
              })
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, 'A empresa já foi cadastrada!', AuthController));
          }
        })
    });
  }

}

export default AuthController;