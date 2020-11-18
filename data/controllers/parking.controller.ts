import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { Http } from '../../commons/core/http';
import { Parking } from "../models/parking.model";
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class ParkingController {

  constructor(@inject(TYPES.IParkingService) private service: IParkingService) { }

  @httpPost('/parking')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new Parking(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/parking/companyId/:companyId/registryCode/:registryCode')
  getByRegistryCode(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByRegistryCode(new Parking(req.params))
        .then((result: Parking[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/parking/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: Parking) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/parkings')
  get(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise(async (resolve) => {
      this.service.toList()
        .then((result: Parking[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/parkings/companyId/:companyId')
  getByCompanyId(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByCompanyId(Number(req.params.companyId))
        .then((result: Parking[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/parkings/employeeId/:employeeId')
  getByEmployeeId(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByEmployeeId(Number(req.params.employeeId))
        .then((result: Parking) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpPut('/parking')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new Parking(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpDelete('/parking/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }
}

export default ParkingController;