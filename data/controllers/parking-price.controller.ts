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

  constructor(@inject(TYPES.IParkingPriceService) private service: IParkingPriceService) {}

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingPriceController
   */
  @httpPost('/parkingSpace')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingPrice(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingPriceController
   */
  @httpGet('/parkingSpace/id/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingPrice) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingPriceController
   */
  @httpGet('/parkingSpace/parkingId/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkinkId(Number(req.params.parkingId))
        .then((result: ParkingPrice[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingPriceController
   */
  @httpPut('/parkingSpace')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingPrice(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingPriceController
   */
  @httpDelete('/parkingSpace/parkingId/:parkingId/type/:type/amount/:amount')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.deleteGroupType(new ParkingPrice(req.params))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Preço', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Preço')));
    });
  }
}

export default ParkingPriceController;