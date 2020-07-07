import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';

import IAuthService from '../interfaces/IServices/IAuthService';
import Auth from "../models/auth";
import Http from '../../commons/core/http';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { HttpCode } from '../../commons/enums/httpCode';
import Attributes from '../../commons/core/attributes';
import Crypto from '../../commons/core/crypto';
import IAuthController from "../interfaces/IControllers/IAuthController";
import IEmployeeRepository from "../interfaces/IRepositories/IEmployeeRepository";
import ICompanyRepository from "../interfaces/IRepositories/ICompanyRepository";
import IParkingRepository from "../interfaces/IRepositories/IParkingRepository";
import IRuleRepository from "../interfaces/IRepositories/IRuleRepository";
import Employee from "../models/employee";
import Company from "../models/company";
import IUserRepository from "../interfaces/IRepositories/IUserRepository";
import User from "../models/user";
import { CryptoType } from "../../commons/enums/cryptoType";

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
    @inject(TYPES.IParkingRepository) private _parkingRepository: IParkingRepository,
    @inject(TYPES.IRuleRepository) private _ruleRepository: IRuleRepository,
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
  @httpPost('/employee/signin')
  @httpPost('/user/signin')
  SignIn(@request() req: Request, @response() res: Response) {
    return new Promise(async (resolve) => {
      const _auth = new Auth(req.body);
      try {
        if (Attributes.IsValid(_auth.employee)) {
          const foundEmployee: Employee = await this._employeeRepository.GetByEmail(_auth.employee.email);
          if (Attributes.IsValid(foundEmployee) && Crypto.Compare(_auth.employee.password, foundEmployee.password)) {
            _auth.company = await this._companyRepository.GetById(foundEmployee.companyId);
            _auth.parking = (await this._parkingRepository.GetByEmployeeId(foundEmployee.id))[0];
            _auth.employee = foundEmployee;
            _auth.authenticationLevel = Attributes.IsValid(foundEmployee.ruleId) ? (await this._ruleRepository.GetById(foundEmployee.ruleId)).level : null;
            this._authService.CreateEmployeeToken(_auth)
              .then((createdAuthentication: Auth) => {
                const result = Crypto.Encrypt(JSON.stringify(createdAuthentication), CryptoType.DEFAULT)
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'Login', result));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Unauthorized, HttpMessage.Login_Unauthorized, 'Login'));
          }
        } else if (Attributes.IsValid(_auth.user)) {
          const foundUser: User = await this._userRepository.GetByEmail(_auth.user.email);
          if (Attributes.IsValid(foundUser) && Crypto.Compare(_auth.user.password, foundUser.password)) {
            _auth.user = foundUser;
            _auth.user.password = undefined;
            this._authService.CreateUserToken(_auth)
              .then((createdAuthentication: Auth) => {
                const result = Crypto.Encrypt(JSON.stringify(createdAuthentication), CryptoType.DEFAULT)
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Login_Authorized, 'Login', result));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Unauthorized, HttpMessage.Login_Unauthorized, 'Login'));
          }
        } else {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Parameters_Not_Provided, 'Login'));
        }
      } catch (error) {
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Login', error));
      }
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
  SignUp(@request() req: Request, @response() res: Response<any>) {
    return new Promise(async (resolve) => {
      const _auth = new Auth(req.body);
      const foundEmployee = Attributes.ReturnIfValid(
        await this._employeeRepository.GetByEmail(_auth.employee.email),
        await this._companyRepository.GetByRegistryCode(_auth.company.registryCode)
      );
      if (!Attributes.IsValid(foundEmployee)) {
        this._companyRepository.GetByRegistryCode(_auth.company.registryCode)
          .then((result: Company[]) => {
            if (!Attributes.IsValid(result)) {
              this._companyRepository.Save(_auth.company)
                .then((createdCompany: { id: number; }) => {
                  _auth.employee.companyId = createdCompany.id;
                  this._employeeRepository.Save(_auth.employee)
                    .then((_result: any) => {
                      resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Account_Created, 'Cadastro', _result));
                    })
                    .catch((error: any) => {
                      resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cadastro', error));
                    });
                }).catch((error: any) => {
                  resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cadastro', error));
                })
            } else {
              resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Empresa'));
            }
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Funcionário'));
      }
    });
  }
}

export default AuthController;