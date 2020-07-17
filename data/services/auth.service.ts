import { IAuthService } from "../interfaces/IServices/authService.interface";
import { injectable, inject } from "inversify";
import * as jwt from 'jsonwebtoken';
import Auth from '../models/auth.model';
import TYPES from "../types";
import IUserRepository from "../interfaces/IRepositories/userRepository.interface";
import IRuleRepository from "../interfaces/IRepositories/ruleRepository.interface";
import { IParkingRepository } from "../interfaces/IRepositories/parkingRepository.interface";
import ICompanyRepository from "../interfaces/IRepositories/companyRepository.interface";
import IEmployeeRepository from "../interfaces/IRepositories/employeeRepository.interface";
import { CryptoType } from "../../commons/enums/cryptoType";
import Attributes from "../../commons/core/attributes";
import Crypto from '../../commons/core/crypto';
import Employee from "../models/employee.model";
import { HttpMessage } from "../../commons/enums/httpMessage";
import User from "../models/user.model";
import Company from "../models/company.model";
import { IEmailService } from "../interfaces/IServices/emailService.interface";
import Email from "../models/email.model";

/**
 * @description
 * @author Marlon Lira
 * @class AuthService
 * @implements {IAuthService}
 */
@injectable()
class AuthService implements IAuthService {

  constructor(
    @inject(TYPES.IEmployeeRepository) private _employeeRepository: IEmployeeRepository,
    @inject(TYPES.ICompanyRepository) private _companyRepository: ICompanyRepository,
    @inject(TYPES.IParkingRepository) private _parkingRepository: IParkingRepository,
    @inject(TYPES.IRuleRepository) private _ruleRepository: IRuleRepository,
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.IEmailService) private _emailService: IEmailService
  ) { }

  signinEmployee(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (Attributes.IsValid(auth.employee)) {
          const foundEmployee: Employee = await this._employeeRepository.GetByEmail(auth.employee.email);
          if (Attributes.IsValid(foundEmployee) && Crypto.Compare(auth.employee.password, foundEmployee.password)) {
            auth.company = await this._companyRepository.GetById(foundEmployee.companyId);
            auth.parking = (await this._parkingRepository.getByEmployeeId(foundEmployee.id))[0];
            auth.employee = foundEmployee;
            auth.employee.password = undefined;
            auth.authenticationLevel = Attributes.IsValid(foundEmployee.ruleId)
              ? (await this._ruleRepository.GetById(foundEmployee.ruleId)).level
              : null;
            auth = await this.createEmployeeToken(auth);
            const result = await Crypto.Encrypt(JSON.stringify(auth), CryptoType.DEFAULT);
            resolve(result);
          } else {
            reject(HttpMessage.Login_Unauthorized)
          }
        } else {
          reject(HttpMessage.Parameters_Not_Provided)
        }
      } catch (error) {
        reject(HttpMessage.Unknown_Error);
      }
    });
  }

  signinUser(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (Attributes.IsValid(auth.user)) {
          const foundUser: User = await this._userRepository.GetByEmail(auth.user.email);
          if (Attributes.IsValid(foundUser) && Crypto.Compare(auth.employee.password, foundUser.password)) {
            auth.user = foundUser;
            auth.user.password = undefined;
            auth = await this.createUserToken(auth);
            const result = await Crypto.Encrypt(JSON.stringify(auth), CryptoType.DEFAULT);
            resolve(result);
          } else {
            reject(HttpMessage.Login_Unauthorized)
          }
        } else {
          reject(HttpMessage.Parameters_Not_Provided)
        }
      } catch (error) {
        reject(HttpMessage.Unknown_Error);
      }
    });
  }

  signupCompany(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundEmployee = Attributes.ReturnIfValid(
          await this._employeeRepository.GetByEmail(auth.employee.email),
          await this._employeeRepository.GetByRegistryCode(auth.employee.registryCode)
        );
        if (!Attributes.IsValid(foundEmployee)) {
          const companies: Company[] = await this._companyRepository.GetByRegistryCode(auth.company.registryCode);
          if (!Attributes.IsValid(companies)) {
            const createdCompany = await this._companyRepository.Save(auth.company);
            auth.employee.companyId = createdCompany.id;
            const createdEmployee = await this._employeeRepository.Save(auth.employee);
            resolve(createdEmployee);
          } else {
            reject(HttpMessage.Already_Exists);
          }
        } else {
          reject(HttpMessage.Already_Exists);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  signupUser(auth: Auth): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns
   * @memberof AuthService
   */
  checkToken(auth: Auth) {
    return new Promise((resolve) => {
      jwt.verify(auth.token, process.env.SECRET, (err) => {
        resolve(err);
      });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<any>}
   * @memberof AuthService
   */
  accountRecoveryEmployee(auth: Auth): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const foundEmployee: Employee = Attributes.ReturnIfValid(
          await this._employeeRepository.GetByEmail(auth.employee.email),
          await this._employeeRepository.GetByRegistryCode(auth.employee.registryCode)
        );
        if (Attributes.IsValid(foundEmployee)) {
          const _email = new Email();
          _email.from = 'help.simpleparking@gmail.com';
          _email.subject = 'Recuperação de Conta';
          _email.text = 'Clique no link abaixo e digite sua nova senha';
          _email.to = foundEmployee.email;

          await this._emailService.send(_email);

          resolve(foundEmployee.email);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<Auth>}
   * @memberof AuthService
   */
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

  /**
   * @description
   * @author Marlon Lira
   * @param {Auth} auth
   * @returns {Promise<Auth>}
   * @memberof AuthService
   */
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
}

export default AuthService;