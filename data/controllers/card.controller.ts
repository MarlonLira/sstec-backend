import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { Http } from '../../commons/core/http';
import { Card } from "../models/card.model";
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ICardService } from "../interfaces/IServices/cardService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class CardController {

  constructor(
    @inject(TYPES.ICardService) private service: ICardService) { }

  @httpPost('/card')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new Card(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Cartão', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Cartão')));
    });
  }

  @httpGet('/card/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: Card) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Cartão', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Cartão')));
    });
  }

  @httpGet('/cards/userId/:userId')
  getByUserId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByUserId(Number(req.params.userId))
        .then((result: Card[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Cartão', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Cartão')));
    });
  }

  @httpPut('/card')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new Card(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Cartão', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Cartão')));
    });
  }

  @httpDelete('/card/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Cartão', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Cartão')));
    });
  }
}

export default CardController;