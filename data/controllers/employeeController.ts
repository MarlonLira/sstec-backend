import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IEmployeeController from "../interfaces/IControllers/IEmployeeController";
import IEmployeeRepository from '../interfaces/IRepositories/IEmployeeRepository';
import Employee from "../models/employee";
import TYPES from '../types';
import Attributes from '../../commons/core/attributes';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';

@controller('')
class EmployeeController implements IEmployeeController {

  constructor(@inject(TYPES.IEmployeeRepository) private _employeeRepository: IEmployeeRepository) { }

  @httpPost('/employee')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    let _employee = new Employee(req.body);
    return new Promise((resolve, reject) => {
      this._employeeRepository.Save(_employee)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Funcionario cadastrado com sucesso', EmployeeController, result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', EmployeeController, error));
        })
    })
  }

  @httpGet('/employee')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpGet('/employee')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpPut('/employee')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpDelete('/employee')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

}

export default EmployeeController;