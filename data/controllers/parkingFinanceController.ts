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
constructor (@inject(TYPES.IParkingFinanceRepository) private _parkingFinanceRepository: IParkingFinanceRepository){}

/**
 * @description
 * @author Felipe Seabra
 * @param {Request<any>} req
 * @param {Response<any>} res
 * @memberof ParkingFinanceController
 */
@httpGet('/parkingFinance/:id')
Search(@request() req: Request<any>, @response() res: Response<any>) {
  return new Promise((resolve) => {
    const _id: number = req.params.id;
    this._parkingFinanceRepository.getById(_id)
    .then(result => {
      resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Finanças', result));
    })
    .catch(error => {
      resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Not_Found, 'Finanças', error));
    })
  })
}

/**
 * @description
 * @author Felipe Seabra
 * @param {Request<any>} req
 * @param {Response<any>} res
 * @memberof ParkingFinanceController
 */
@httpPost('/parkingFinance')
Save(@request() req: Request<any>, @response() res: Response<any>) {
  return new Promise((resolve) => {
    const _parkingFinance = new ParkingFinance(req.body.parkingFinance);
    _parkingFinance.parkingId = req.body.parking.id;
    _parkingFinance.companyId = req.body.company.id;
    this._parkingFinanceRepository.Save(_parkingFinance)
    .then(result => {
      resolve(Http.SendMessage(res,HttpCode.Ok, HttpMessage.Saved_Successfully, 'Finança', result ));
    })
    .catch(error => {
      resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Finança', error));
    })
  })
}

/**
 * @description
 * @author Felipe Seabra
 * @param {Request<any>} req
 * @param {Response<any>} res
 * @memberof ParkingFinanceController
 */
@httpPut('/parkingFinance')
Update(@request() req: Request<any>, @response() res: Response<any>) {
  return new Promise((resolve) => {
    const _parkingFinance = new ParkingFinance(req.body);
    this._parkingFinanceRepository.Update(_parkingFinance)
    .then(result => {
      resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Finança', result));
    })
    .catch(error => {
      resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Finança', error));
    })
  })
}
@httpGet('/parkingFinance')
SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
  return new Promise((resolve) => {
    this._parkingFinanceRepository.ToList()
    .then(result => {
      resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Finança', result));
    })
    .catch(error => {
      resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Finança', error));
    });
  });
}
}
export default ParkingFinanceController;