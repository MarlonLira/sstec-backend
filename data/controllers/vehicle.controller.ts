import { Response, Request } from "express";
import { controller, httpPost, request, response, httpGet, httpDelete, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import Vehicle from "../models/vehicle.model";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IVehicleService } from "../interfaces/IServices/vehicleService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class VehicleController {

  constructor(@inject(TYPES.IVehicleService) private service: IVehicleService) { }

  @httpPost('/vehicle')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new Vehicle(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Veículo', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Veículo')));
    });
  }

  @httpGet('/vehicle/licensePlate/:licensePlate')
  getByLicensePlate(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByLicensePlate(req.params.licensePlate)
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Veículo', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Veículo')));
    });
  }

  @httpGet('/vehicles/userId/:userId')
  getByUserId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByUserId(req.params.userId)
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Veículo', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Veículo')));
    });
  }

  @httpGet('/vehicles/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(req.params.id)
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Veículo', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Veículo')));
    });
  }

  @httpPut('/vehicle')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new Vehicle(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Veículo', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Veículo')));
    });
  }

  @httpDelete('/vehicles/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Veículo', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Veículo')));
    });
  }

}

export default VehicleController;