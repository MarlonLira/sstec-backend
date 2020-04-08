import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IEmployeeController from "../interfaces/IControllers/IEmployeeController";
import IEmployeeRepository from '../interfaces/IRepositories/IEmployeeRepository';
import Employee from "../models/employee";
import TYPES from '../types';
import { Attributes, Crypto } from '../../commons/helpers';
import { Http } from '../../commons/http';
import { HttpCode } from '../../commons/enums/httpCode';

@controller('')
class EmployeeController implements IEmployeeController {

  constructor(@inject(TYPES.IEmployeeRepository) private _employeeRepository: IEmployeeRepository) { }

  @httpPost('/employee')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    let _employee = new Employee(req.body);
    return new Promise((resolve) => {
      this._employeeRepository.Save(_employee)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Funcionario cadastrado com sucesso', EmployeeController, result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', EmployeeController, error));
        })
    })
  }

  @httpGet('/company')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpGet('/companies')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpPut('/company')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpDelete('/company')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

}

export default EmployeeController;