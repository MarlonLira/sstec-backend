import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { ParkingPrice } from "../models/parking-price.model";
import TYPES from '../types';
import { Http } from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { safetyMiddleware } from "../../middleware/safety/safety.config";
import { IParkingPriceService } from "../interfaces/IServices/parking-priceService.interface";

@controller('', safetyMiddleware())
class ParkingPriceController {

  constructor(@inject(TYPES.IParkingPriceService) private service: IParkingPriceService) { }

  @httpPost('/parkingPrice')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingPrice(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  @httpGet('/parkingPrice/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingPrice) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  @httpGet('/parkingPrice/parkingId/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkingId(Number(req.params.parkingId))
        .then((result: ParkingPrice[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  @httpPut('/parkingPrice')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new ParkingPrice(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  @httpDelete('/parkingPrice/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }
}

export default ParkingPriceController;