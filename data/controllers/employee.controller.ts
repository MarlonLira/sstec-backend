import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IEmployeeRepository from '../interfaces/IRepositories/employeeRepository.interface';
import Employee from "../models/employee.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";
import { CryptoType } from '../../commons/enums/cryptoType';
import Crypto from '../../commons/core/crypto';
import { IEmployeeService } from "../interfaces/IServices/employeeService.interface";

@controller('')
class EmployeeController {

  /**
   * Creates an instance of EmployeeController.
   * @author Marlon Lira
   * @param {IEmployeeRepository} _employeeRepository
   * @memberof EmployeeController
   */
  constructor(
    @inject(TYPES.IEmployeeRepository) private _employeeRepository: IEmployeeRepository,
    @inject(TYPES.IEmployeeService) private service: IEmployeeService) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof EmployeeController
   */
  @httpPost('/employee')
  post(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.save(new Employee(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof EmployeeController
   */
  @httpGet('/employee/parkingId/:parkingId/registryCode/:registryCode')
  @httpGet('/employee/parkingId/:parkingId/name/:name')
  @httpGet('/employee/companyId/:companyId/name/:name')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise(async (resolve) => {
      try {
        const _employee = new Employee(req.params);
        let foundEmployees: any = null;
        if (Attributes.IsValid(_employee.parkingId) && Attributes.IsValid(_employee.registryCode)) {
          foundEmployees = await this._employeeRepository.GetByRegistryCode(_employee.registryCode);
          foundEmployees = foundEmployees.find(r => r.parkingId === Number(_employee.parkingId));
          resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Funcionário', foundEmployees))
        } else if (Attributes.IsValid(_employee.parkingId) && Attributes.IsValid(_employee.name)) {
          foundEmployees = await this._employeeRepository.GetByName(_employee.name, Number(_employee.parkingId), 0);
          resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Funcionário', foundEmployees))
        } else if (Attributes.IsValid(_employee.companyId) && Attributes.IsValid(_employee.registryCode)) {
          foundEmployees = await this._employeeRepository.GetByRegistryCode(_employee.registryCode);
          foundEmployees = foundEmployees.find(r => r.companyId === Number(_employee.companyId));
          resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Funcionário', foundEmployees))
        } else if (Attributes.IsValid(_employee.companyId) && Attributes.IsValid(_employee.name)) {
          foundEmployees = await this._employeeRepository.GetByName(_employee.name, 0, Number(_employee.companyId));
          foundEmployees = foundEmployees.find(r => r.companyId === Number(_employee.companyId));
          resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Funcionário', foundEmployees))
        } else {
          resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Funcionário'));
        }
      } catch (error) {
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Funcionário', error));
      }
    });
  }

  @httpGet('/employee/companyId/:companyId/registryCode/:registryCode')
  getByRegistryCode(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByRegistryCode(req.params.registryCode)
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }
  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof EmployeeController
   */
  @httpGet('/employees/companyId/:companyId')
  getAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.toList(Number(req.params.companyId))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  @httpGet('/employees/parkingId/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.getByParkingId(Number(req.params.parkingId))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  getByEmail(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.getByEmail(req.params.email)
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }
  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof EmployeeController
   */
  @httpPut('/employee')
  put(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.update(new Employee(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  @httpGet('/employee/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof EmployeeController
   */
  @httpDelete('/employee/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }
}

export default EmployeeController;