import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import { ParkingScore } from "../models/parking-score.model";
import TYPES from '../types';
import { Http } from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingScoreService } from "../interfaces/IServices/parking-scoreService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class ParkingScoreController {

  constructor(@inject(TYPES.IParkingScoreService) private service: IParkingScoreService) { }

  @httpPost('/parkingScore')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingScore(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('parkingScore/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingScore) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Avaliação', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Avaliação')));
    });
  }

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