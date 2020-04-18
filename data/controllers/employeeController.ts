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
    const _employee = new Employee(req.body);
    return new Promise((resolve) => {
      this._employeeRepository.Save(_employee)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Funcionario', result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Funcionario', error));
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof EmployeeController
   */
  @httpGet('/employee')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof EmployeeController
   */
  @httpGet('/employee')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
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
    throw new Error("Method not implemented.");
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
      const _id: number =  req.params.id;
      this._employeeRepository.Delete(_id)
        .then(result =>{
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Funcionario', result));
        })
        .catch(error =>{
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Funcionario', error));
        });
    });
  }
}

export default EmployeeController;