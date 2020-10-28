import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { SchedulingProduct } from "../models/scheduling-product.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ISchedulingProductService } from "../interfaces/IServices/scheduling-productService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class SchedulingProductController {

  constructor(@inject(TYPES.ISchedulingProductService) private service: ISchedulingProductService) { }

  @httpPost('/scheduling-product')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new SchedulingProduct(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpGet('/scheduling-product/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: SchedulingProduct) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpGet('/scheduling-product/schedulingId/:schedulingId')
  getBySchedulingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getBySchedulingId(Number(req.params.schedulingId))
        .then((result: SchedulingProduct[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpGet('/scheduling-product/parkingProductId/:parkingProductId')
  getByParkingProductId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkingProductId(Number(req.params.parkingProductId))
        .then((result: SchedulingProduct[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpPut('/scheduling-product')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new SchedulingProduct(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }

  @httpDelete('/scheduling-product/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Agendamento de serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento de serviço')));
    });
  }
}

export default SchedulingProductController;