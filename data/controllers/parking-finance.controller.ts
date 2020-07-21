import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import IParkingFinanceRepository from '../interfaces/IRepositories/parking-financeRepository.interface';
import ParkingFinance from "../models/parking-finance.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";

@controller('')
class ParkingFinanceController {


  /**
   * @description
   * @author Felipe Seabra
   * @param {IParkingFinanceRepository} _parkingFinanceRepositor
   * @memberof ParkingFinanceController
   */
  constructor(@inject(TYPES.IParkingFinanceRepository) private _parkingFinanceRepository: IParkingFinanceRepository) { }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingFinanceController
   */
  @httpGet('/parkingFinance/id/:id')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._parkingFinanceRepository.GetById(_id)
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
      this._parkingFinanceRepository.Save(_parkingFinance)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Finança', result));
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
   * @returns
   * @memberof ParkingFinanceController
   */
  @httpGet('/parkingFinance/:parkingId')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _parkingId: number = req.params.parkingId;
      this._parkingFinanceRepository.ToList(_parkingId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Finança', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Finança', error));
        });
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
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _parkingFinance = new ParkingFinance(req.body.parkingFinance);
      this._parkingFinanceRepository.Update(_parkingFinance)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Agendamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
        });
    });
  }

  @httpDelete('/ParkingFinance/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _parkingFinanceId: number = req.params.id;
      this._parkingFinanceRepository.Delete(_parkingFinanceId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Finança', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Unknown_Error, 'Finança', error));
        });
    });
  }
}
export default ParkingFinanceController;