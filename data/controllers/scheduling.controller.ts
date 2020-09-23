import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { Scheduling } from "../models/scheduling.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ISchedulingService } from "../interfaces/IServices/schedulingService.interface";

@controller('')
class SchedulingController {

  constructor(@inject(TYPES.ISchedulingService) private service: ISchedulingService) { }

  @httpPost('/scheduling')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new Scheduling(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Scheduling', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Scheduling')));
    });
  }

  @httpGet('/schedulings/userId/:userId')
  getByUserId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByUserId(Number(req.params.userId))
        .then((result: Scheduling[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Scheduling', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Scheduling')));
    });
  }

  @httpGet('/scheduling/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: Scheduling) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Scheduling', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Scheduling')));
    });
  }

  @httpGet('/schedulings/companyId/:companyId')
  getByCompanyId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByCompanyId(Number(req.params.companyId))
        .then((result: Scheduling[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Scheduling', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Scheduling')));
    });
  }

  @httpGet('/schedulings/parkingId/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkingId(Number(req.params.parkingId))
        .then((result: Scheduling[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Scheduling', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Scheduling')));
    });
  }

  @httpPut('/scheduling')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new Scheduling(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpDelete('/scheduling/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }
}

export default SchedulingController;