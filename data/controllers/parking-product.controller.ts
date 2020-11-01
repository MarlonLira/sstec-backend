import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { ParkingProduct } from "../models/parking-product.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingProductService } from "../interfaces/IServices/parking-productService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class ParkingProductController {

  constructor(@inject(TYPES.IParkingProductService) private service: IParkingProductService) { }

  @httpPost('/parkingProduct')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingProduct(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Produto/Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Produto/Serviço')));
    });
  }

  @httpGet('/parkingProduct/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingProduct) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Produto/Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Produto/Serviço')));
    });
  }

  @httpGet('/parkingProduct/parkingId/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkinkId(Number(req.params.parkingId))
        .then((result: ParkingProduct[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Produto/Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Produto/Serviço')));
    });
  }

  @httpPut('/parkingProduct')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new ParkingProduct(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Produto/Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Produto/Serviço')));
    });
  }

  @httpDelete('/parkingProduct/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Produto/Serviço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Produto/Serviço')));
    });
  }
}

export default ParkingProductController;