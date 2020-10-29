import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import ParkingFinance from "../models/parking-finance.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { safetyMiddleware } from "../../middleware/safety/safety.config";
import { IParkingFinanceService } from "../interfaces/IServices/parking-financeService.interface";

@controller('', safetyMiddleware())
class ParkingFinanceController {


  /**
   * @description
   * @author Felipe Seabra
   * @param {IParkingFinanceRepository} _parkingFinanceRepositor
   * @memberof ParkingFinanceController
   */
  constructor(@inject(TYPES.IParkingFinanceService) private service: IParkingFinanceService) { }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingFinanceController
   */

  @httpGet('/parkingFinance/id/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingFinance) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Finanças', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Finanças')));
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingFinanceController
   */

  @httpPost('/parkingFinance')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingFinance(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Finança', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Finança')));
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof ParkingFinanceController
   */

  @httpGet('/parkingFinance/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.toList(Number(req.params.parkingId))
        .then((result: ParkingFinance[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Finança', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Finança')));
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof ParkingFinanceController
   */

  @httpPut('/parkingFinance')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new ParkingFinance(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Agendamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Agendamento')));
    });
  }

  @httpDelete('/parkingFinance/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Finança', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Finança')));
    });
  }
}
export default ParkingFinanceController;