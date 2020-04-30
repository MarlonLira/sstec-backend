import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import IParkingFinanceController from "../interfaces/IControllers/IParkingFinanceController";
import IParkingFinanceRepository from '../interfaces/IRepositories/IParkingFinanceRepository';
import ParkingFinance from "../models/parkingFinance";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";


/**
 * @description
 * @author Felipe Seabra
 * @class ParkingFinanceController
 * @implements {IParkingFinanceController}
 */
@controller('')
class ParkingFinanceController implements IParkingFinanceController{


/**
 * @description
 * @author Felipe Seabra
 * @param {IParkingFinanceRepository} _parkingFinanceRepositor
 * @memberof ParkingFinanceController
 */
constructor (@inject(TYPES.IParkingFinanceRepository) private _parkingFinanceRepositor: IParkingFinanceRepository){}


@httpGet('/parkingFinance')
Search(@request() req: Request<any>, @response() res: Response<any>) {
  throw new Error("Method not implemented.");
}
@httpPost('/parkingFinance')
Save(@request() req: Request<any>, @response() res: Response<any>) {
  throw new Error("Method not implemented.");
}
@httpPut('/payment')
Update(@request() req: Request<any>, @response() res: Response<any>) {
  throw new Error("Method not implemented.");
}
@httpGet('/parkingFinance')
SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
  throw new Error("Method not implemented.");
}
}
export default ParkingFinanceController;