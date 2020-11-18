import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { Employee } from "../models/employee.model";
import TYPES from '../types';
import { Http } from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IEmployeeService } from "../interfaces/IServices/employeeService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class EmployeeController {

  constructor(@inject(TYPES.IEmployeeService) private service: IEmployeeService) { }

  @httpPost('/employee')
  post(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.save(new Employee(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  @httpGet('/employees/companyId/:companyId')
  getByCompanyId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByCompanyId(req.params.companyId)
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  @httpGet('/employee/registryCode/:registryCode')
  getByRegistryCode(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByRegistryCode(req.params.registryCode)
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

  @httpGet('/employee/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  @httpGet('/employee/email/:email')
  getByEmail(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.getByEmail(req.params.email)
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

  @httpPut('/employee')
  put(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.update(new Employee(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Funcionario', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Funcionario')));
    });
  }

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