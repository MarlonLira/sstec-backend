import { IAuthService } from "../interfaces/IServices/authService.interface";
import { injectable, inject } from "inversify";
import * as jwt from 'jsonwebtoken';
import { Auth } from '../models/auth.model';
import TYPES from "../types";
import IUserRepository from "../interfaces/IRepositories/userRepository.interface";
import { IEmployeeRepository } from "../interfaces/IRepositories/employeeRepository.interface";
import { CryptoType } from "../../commons/enums/cryptoType";
import Attributes from "../../commons/core/attributes";
import Crypto from '../../commons/core/crypto';
import { Employee } from "../models/employee.model";
import { HttpMessage } from "../../commons/enums/httpMessage";
import User from "../models/user.model";
import { Company } from "../models/company.model";
import { IEmailService } from "../interfaces/IServices/emailService.interface";
import { Email } from "../models/email.model";
import { HttpCode } from "../../commons/enums/httpCode";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import { IRuleService } from "../interfaces/IServices/ruleService.interface";
import { ICompanyService } from "../interfaces/IServices/companyService.interface";

@injectable()
export class AuthService implements IAuthService {

  constructor(
    @inject(TYPES.IEmployeeRepository) private _employeeRepository: IEmployeeRepository,
    @inject(TYPES.ICompanyService) private _companyService: ICompanyService,
    @inject(TYPES.IParkingService) private _parkingService: IParkingService,
    @inject(TYPES.IRuleService) private _ruleService: IRuleService,
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.IEmailService) private _emailService: IEmailService,
    @inject(TYPES.ILogService) private log: ILogService
  ) { }

  signinEmployee(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (Attributes.IsValid(auth.employee)) {
          const foundEmployee: Employee = await this._employeeRepository.getByEmail(auth.employee.email);
          if (Attributes.IsValid(foundEmployee) && Crypto.Compare(auth.employee.password, foundEmployee.password)) {
            auth.company = await this._companyService.getById(foundEmployee.companyId);
            auth.parking = (await this._parkingService.getByEmployeeId(foundEmployee.id))[0];
            auth.employee = foundEmployee;
            auth.employee.password = undefined;
            auth.authenticationLevel = Attributes.IsValid(foundEmployee.ruleId)
              ? (await this._ruleService.getById(foundEmployee.ruleId)).level
              : null;
            auth = await this.createEmployeeToken(auth);
            const result = await Crypto.Encrypt(JSON.stringify(auth), CryptoType.DEFAULT);
            resolve(result);
          } else {
            reject(await this.log.error('Auth', HttpCode.Bad_Request, HttpMessage.Login_Unauthorized, undefined));
          }
        } else {
          reject(await this.log.warn('Auth', HttpCode.Internal_Server_Error, HttpMessage.Parameters_Not_Provided, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
      }
    });
  }

  signinUser(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (Attributes.IsValid(auth.user)) {
          const foundUser: User = await this._userRepository.GetByEmail(auth.user.email);
          if (Attributes.IsValid(foundUser) && Crypto.Compare(auth.user.password, foundUser.password)) {
            auth.user = foundUser;
            auth.user.password = undefined;
            auth = await this.createUserToken(auth);
            const result = await Crypto.Encrypt(JSON.stringify(auth), CryptoType.DEFAULT);
            resolve(result);
          } else {
            reject(await this.log.error('Auth', HttpCode.Bad_Request, HttpMessage.Login_Unauthorized, undefined));
          }
        } else {
          reject(await this.log.warn('Auth', HttpCode.Internal_Server_Error, HttpMessage.Parameters_Not_Provided, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
      }
    });
  }

  signupCompany(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundEmployee = Attributes.ReturnIfValid(
          await this._employeeRepository.getByEmail(auth.employee.email),
          await this._employeeRepository.getByRegistryCode(auth.employee.registryCode)
        );
        if (!Attributes.IsValid(foundEmployee)) {
          const company: Company = await this._companyService.getByRegistryCode(auth.company.registryCode);
          if (!Attributes.IsValid(company)) {
            const createdCompany = await this._companyService.save(auth.company);
            auth.employee.companyId = createdCompany.id;
            auth.employee.ruleId = 2;

            this._employeeRepository.save(auth.employee)
              .then((result: Employee) => {
                result.password = undefined;
                resolve(result);
              })
              .catch(async (error: any) => {
                await this._companyService.delete(auth.employee.companyId);
                reject(await this.log.error('Signup Employee', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
              });

          } else {
            reject(await this.log.error('Signup Company', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
          }
        } else {
          reject(await this.log.error('Signup Employee', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
      }
    });
  }

  signupUser(auth: Auth): Promise<any> {
    throw new Error("Method not implemented.");
  }

  checkToken(auth: Auth) {
    return new Promise((resolve) => {
      jwt.verify(auth.token, process.env.SECRET, (err) => {
        resolve(err);
      });
    });
  }

  accountRecoveryEmployee(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundEmployee: Employee = await Attributes.ReturnIfValid(
          await this._employeeRepository.getByRegistryCode(auth.employee.registryCode),
          await this._employeeRepository.getByEmail(auth.employee.email)
        );
        if (Attributes.IsValid(foundEmployee)) {
          if (Attributes.IsValid(foundEmployee.email)) {
            const _email = new Email();
            const _newPassword = Crypto.randomPassword();
            _email.from = 'help.simpleparking@gmail.com';
            _email.subject = 'Recuperação de Conta';
            _email.text = `Clique no link abaixo e digite sua nova senha ${_newPassword}`;
            _email.to = foundEmployee.email;
            foundEmployee.password = Crypto.Encrypt(_newPassword, CryptoType.PASSWORD);
            this._employeeRepository.update(foundEmployee)
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
        reject(await this.log.critical('Auth', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
      }
    });
  }

  createEmployeeToken(auth: Auth): Promise<Auth> {
    return new Promise((resolve) => {
      const id = auth.employee.id;
      const name = auth.employee.name;

      auth.token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });
      auth.validated = true;

      resolve(auth);
    });
  }

  createUserToken(auth: Auth): Promise<Auth> {
    return new Promise((resolve) => {
      const id = auth.user.id;
      const name = auth.user.name;

      auth.token = jwt.sign({ id, name }, process.env.SECRET, {
        expiresIn: "1h"
      });
      auth.validated = true;

      resolve(auth);
    });
  }

  protectedEmail = (email: string) => {
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