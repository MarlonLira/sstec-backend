import { IAuthService } from "../interfaces/IServices/authService.interface";
import { injectable, inject } from "inversify";
import * as jwt from 'jsonwebtoken';
import { Auth } from '../models/auth.model';
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { CryptoType } from "../../commons/enums/cryptoType";
import { Attributes } from "../../commons/core/attributes";
import { Crypto } from '../../commons/core/crypto';
import { Employee } from "../models/employee.model";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { User } from "../models/user.model";
import { Company } from "../models/company.model";
import { IEmailService } from "../interfaces/IServices/emailService.interface";
import { Email } from "../models/email.model";
import { HttpCode } from "../../commons/enums/httpCode";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import { IRuleService } from "../interfaces/IServices/ruleService.interface";
import { ICompanyService } from "../interfaces/IServices/companyService.interface";
import { IUserService } from "../interfaces/IServices/userService.interface";
import { IRouteSecurityService } from "../interfaces/IServices/route-securityService.interface";
import { IEmployeeService } from "../interfaces/IServices/employeeService.interface";

@injectable()
export class AuthService implements IAuthService {

  constructor(
    @inject(TYPES.IEmployeeService) private _employeeService: IEmployeeService,
    @inject(TYPES.ICompanyService) private _companyService: ICompanyService,
    @inject(TYPES.IUserService) private _userService: IUserService,
    @inject(TYPES.IEmailService) private _emailService: IEmailService,
    @inject(TYPES.IRouteSecurityService) private _routeSecurityService: IRouteSecurityService,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  signinEmployee(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (Attributes.isValid(auth.employee)) {
          const foundEmployee: Employee = await this._employeeService.getByEmail(auth.employee.email);
          if (Attributes.isValid(foundEmployee) && Crypto.compare(auth.employee.password, foundEmployee.password)) {
            auth.company = foundEmployee.company;;
            auth.parking = foundEmployee.parking;
            auth.routeSecurity = await this._routeSecurityService.getByCompanyId(foundEmployee.companyId);
            auth.employee = foundEmployee;
            auth.employee.password = undefined;
            auth.authenticationLevel = foundEmployee.rule?.level;
            const result = await this.authEncrypt(auth, 'Employee');
            resolve(result);
          } else {
            reject(await this.log.error('Auth', HttpCode.Bad_Request, HttpMessage.Login_Unauthorized, undefined));
          }
        } else {
          reject(await this.log.warn('Auth', HttpCode.Internal_Server_Error, HttpMessage.Parameters_Not_Provided, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
      }
    });
  }

  signinUser(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (Attributes.isValid(auth.user)) {
          const foundUser: User = await this._userService.getByEmail(auth.user.email);
          if (Attributes.isValid(foundUser) && Crypto.compare(auth.user.password, foundUser.password)) {
            auth.user = foundUser;
            auth.user.password = undefined;
            const result = await this.authEncrypt(auth, 'User');
            resolve(result);
          } else {
            reject(await this.log.error('Auth', HttpCode.Bad_Request, HttpMessage.Login_Unauthorized, undefined));
          }
        } else {
          reject(await this.log.warn('Auth', HttpCode.Internal_Server_Error, HttpMessage.Parameters_Not_Provided, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
      }
    });
  }


  signupCompany(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundEmployee = Attributes.returnIfValid(
          await this._employeeService.getByEmail(auth.employee.email),
          await this._employeeService.getByRegistryCode(auth.employee.registryCode)
        );
        if (!Attributes.isValid(foundEmployee)) {
          const company: Company = await this._companyService.getByRegistryCode(auth.company.registryCode);
          if (!Attributes.isValid(company)) {
            const createdCompany = await this._companyService.save(auth.company);
            auth.employee.companyId = createdCompany.id;
            auth.employee.ruleId = 2;

            this._employeeService.save(auth.employee)
              .then((result: Employee) => {
                result.password = undefined;
                resolve(result);
              })
              .catch(async (error: any) => {
                await this._companyService.delete(auth.employee.companyId);
                reject(await this.log.error('Signup Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
              });

          } else {
            reject(await this.log.error('Signup Company', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
          }
        } else {
          reject(await this.log.error('Signup Employee', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
      }
    });
  }

  signupUser(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this._userService.save(auth.user)
          .then(result => resolve(result));
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
      }
    });
  }

  checkToken(token: string) {
    return new Promise((resolve) => {
      if (Attributes.isValid(token)) {
        jwt.verify(token, process.env.SECRET, (err) => {
          resolve({ "valid": !err });
        });
      } else {
        resolve({ "valid": false })
      }
    });
  }

  accountRecoveryEmployee(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundEmployee: Employee = await Attributes.returnIfValid(
          await this._employeeService.getByRegistryCode(auth.employee.registryCode),
          await this._employeeService.getByEmail(auth.employee.email)
        );
        if (Attributes.isValid(foundEmployee)) {
          if (Attributes.isValid(foundEmployee.email)) {
            const _email = new Email();
            const _newPassword = Crypto.randomPassword();
            _email.from = 'help.simpleparking@gmail.com';
            _email.subject = 'Recuperação de Conta';
            _email.text = `Sua nova senha: ${_newPassword}`;
            _email.to = foundEmployee.email;
            foundEmployee.password = Crypto.encrypt(_newPassword, CryptoType.PASSWORD);
            this._employeeService.update(foundEmployee)
              .then(async () => {
                await this._emailService.send(_email);
                resolve(this.protectedEmail(foundEmployee.email));
              })

          } else {
            reject(await this.log.error('Auth', HttpCode.Expectation_Failed, HttpMessage.Parameters_Not_Provided, undefined));
          }
        } else {
          reject(await this.log.error('Employee', HttpCode.Not_Found, HttpMessage.Not_Found, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
      }
    });
  }

  private async authEncrypt(auth: Auth, object: 'Employee' | 'User'): Promise<string> {
    switch (object) {
      case 'Employee':
        return await this.createEmployeeToken(auth);
      case 'User':
        return await this.createUserToken(auth);
    }
  }

  private createEmployeeToken(auth: Auth): Promise<string> {
    return new Promise((resolve) => {
      const id = auth.employee.id;
      const name = auth.employee.name;

      auth.token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });
      auth.validated = true;

      const result = Crypto.encrypt(JSON.stringify(auth), CryptoType.DEFAULT);
      resolve(result);
    });
  }

  private createUserToken(auth: Auth): Promise<string> {
    return new Promise((resolve) => {
      const id = auth.user.id;
      const name = auth.user.name;

      auth.token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });
      auth.validated = true;

      const result = Crypto.encrypt(JSON.stringify(auth), CryptoType.DEFAULT);
      resolve(result);
    });
  }

  private protectedEmail = (email: string) => {
    const result =
      `
    ${email.substring(4, 0)}****
    ${email.substring(email.indexOf('@'), email.indexOf('@') - 1)}
    ${email.substring(email.indexOf('@'), email.indexOf('@') + 4)}****
    ${email.substring(email.length - 4)}
    `
    return result;
  }
}