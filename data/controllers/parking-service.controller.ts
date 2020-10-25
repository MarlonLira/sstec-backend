import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { ParkingService } from "../models/parking-service.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingServiceService } from "../interfaces/IServices/parking-serviceService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class ParkingServiceController {

  constructor(@inject(TYPES.IParkingServiceService) private service: IParkingServiceService) { }

  @httpPost('/parkingService')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new ParkingService(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Serviço')));
    });
  }

  @httpGet('/parkingService/id/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingService) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Serviço')));
    });
  }

  @httpGet('/parkingService/parkingId/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkinkId(Number(req.params.parkingId))
        .then((result: ParkingService[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Serviço')));
    });
  }

  @httpPut('/parkingService')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new ParkingService(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Serviço')));
    });
  }

  @httpDelete('/parkingService/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Serviço')));
    });
  }
}

export default ParkingServiceController;