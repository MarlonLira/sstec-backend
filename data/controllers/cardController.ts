import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ICardController from '../interfaces/IControllers/ICardController';
import ICardRepository from '../interfaces/IRepositories/ICardRepository';
import Card from "../models/card";
import TYPES from '../types';
import Attributes from '../../commons/core/attributes';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';

/**
 * @description
 * @author Gustavo Gusmão
 * @class CardController
 * @implements {ICardController}
 */
@controller('')
class CardController implements ICardController {

  /**
   *Creates an instance of CardController.
   * @author Gustavo Gusmão
   * @param {ICardRepository} cardRepository
   * @memberof CardController
   */
  constructor(@inject(TYPES.ICardRepository) private _cardRepository: ICardRepository) {}

  @httpPost('/card')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    let _card = new Card(req.body.card);
    let _userId = req.body.user.id;
    return new Promise((resolve, reject) => {
      this._cardRepository.Save(_card, _userId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Cartão cadastrado com sucesso!', CardController, result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, error , CardController))
        });
    });
  }

  @httpGet('/card')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpPut('/card')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve, reject) => {
      let _card = new Card(req.body);
      this._cardRepository.Update(_card)
      .then(result =>{
        resolve(Http.SendMessage(res, HttpCode.Ok, 'Cartão atualizado com sucesso', CardController, result));
      })
      .catch(error =>{
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
      })
    })
  }

  @httpDelete('/card')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

}

export default CardController;