import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IEmployeeController from "../interfaces/IControllers/IEmployeeController";
import IEmployeeRepository from '../interfaces/IRepositories/IEmployeeRepository';
import Employee from "../models/employee";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";

/**
 * @description
 * @author Marlon Lira
 * @class EmployeeController
 * @implements {IEmployeeController}
 */
@controller('')
class EmployeeController implements IEmployeeController {

  /**
   * Creates an instance of EmployeeController.
   * @author Marlon Lira
   * @param {IEmployeeRepository} _employeeRepository
   * @memberof EmployeeController
   */
  constructor(@inject(TYPES.IEmployeeRepository) private _employeeRepository: IEmployeeRepository) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof EmployeeController
   */
  @httpPost('/employee')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise(async (resolve) => {
      const _employee = new Employee(req.body.employee);
      const foundEmployee = Attributes.ReturnIfValid(
        await this._employeeRepository.GetByRegistryCode(_employee.registryCode),
        await this._employeeRepository.GetByEmail(_employee.email)
      );
      if (!Attributes.IsValid(foundEmployee)) {
        this._employeeRepository.Save(_employee)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Funcionário', result))
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Funcionário', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Funcionário'));
      }

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
  @httpGet('/employee/companyId/:companyId/registryCode/:registryCode')
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
          foundEmployees = await this._employeeRepository.GetByName(_employee.name, Number(_employee.parkingId),0);
          resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Funcionário', foundEmployees))
        } else if (Attributes.IsValid(_employee.companyId) && Attributes.IsValid(_employee.registryCode)) {
          foundEmployees = await this._employeeRepository.GetByRegistryCode(_employee.registryCode);
          foundEmployees = foundEmployees.find(r => r.companyId === Number(_employee.companyId));
          resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Funcionário', foundEmployees))
        } else if (Attributes.IsValid(_employee.companyId) && Attributes.IsValid(_employee.name)) {
          foundEmployees = await this._employeeRepository.GetByName(_employee.name,0,Number(_employee.companyId));
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof EmployeeController
   */
  @httpGet('/employees/parkingId/:parkingId')
  @httpGet('/employees/companyId/:companyId')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise(async (resolve) => {
      try {
        const _employee = new Employee(req.params);
        let result: Employee[] = null;
        if (Attributes.IsValid(_employee.parkingId)) {
          result = await this._employeeRepository.GetByParkingId(_employee.parkingId);
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionário', result))
        } else if (Attributes.IsValid(_employee.companyId)) {
          result = await this._employeeRepository.GetByCompanyId(_employee.companyId);
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionário', result))
        } else {
          resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Funcionário'));
        }
      } catch (error) {
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Funcionário', error));
      }
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
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _employee = new Employee(req.body.employee);
      if (Attributes.IsValid(_employee.id)) {
        this._employeeRepository.Update(_employee)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Funcionário', result));
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Funcionário', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Funcionário'));
      }
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
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._employeeRepository.Delete(_id)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Funcionário', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Funcionário', error));
        });
    });
  }
}

export default EmployeeController;