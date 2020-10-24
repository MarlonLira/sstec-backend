import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { SchedulingService } from "../models/scheduling-service.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ISchedulingServiceService } from "../interfaces/IServices/scheduling-serviceService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class SchedulingServiceController {

  constructor(@inject(TYPES.ISchedulingServiceService) private service: ISchedulingServiceService) { }

  @httpPost('/scheduling-service')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new SchedulingService(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpGet('/scheduling-service/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: SchedulingService) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpPut('/scheduling-service')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new SchedulingService(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpDelete('/scheduling-service/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }
}

export default SchedulingServiceController;