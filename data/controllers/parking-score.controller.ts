import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { ParkingScore } from "../models/parking-score.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingScoreService } from "../interfaces/IServices/parking-scoreService.interface";

@controller('')
class ParkingScoreController {

  constructor(@inject(TYPES.IParkingScoreService) private service: IParkingScoreService) { }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  @httpPost('/parkingScore')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingScore(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  @httpGet('/parkingScore/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingScore) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Avaliação', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Avaliação')));
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  @httpGet('/parkingsScores/:parkingId')
  getByParkingId(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkingId(Number(req.params.parkingId))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Avaliação', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Avaliação')));
    });
  }

  @httpPut('/parkingScore')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new ParkingScore(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Avaliação', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Avalição')));
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  @httpDelete('/parkingScore/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Avaliação', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Avaliação')));
    });
  }
}

export default ParkingScoreController;