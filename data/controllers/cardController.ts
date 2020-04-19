import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ICardController from '../interfaces/IControllers/ICardController';
import ICardRepository from '../interfaces/IRepositories/ICardRepository';
import Card from "../models/card";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";

/**
 * @description
 * @author Gustavo Gusmão
 * @class CardController
 * @implements {ICardController}
 */
@controller('')
class CardController implements ICardController {

  /**
   * Creates an instance of CardController.
   * @author Marlon Lira
   * @param {ICardRepository} _cardRepository
   * @param {IUserRepository} _userRepository
   * @memberof CardController
   */
  constructor(
    @inject(TYPES.ICardRepository) private _cardRepository: ICardRepository) { }

  @httpPost('/card')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    const _card = new Card(req.body.card);
    return new Promise((resolve) => {
      this._cardRepository.GetByUserId(_card.userId)
        .then((foundCards: Card[]) => {
          if (!Attributes.IsValid(foundCards)) {
            this._cardRepository.Save(_card)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Cartão', result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cartão', error));
              });
          } else {
            const findCard = foundCards.find(c => c.number === _card.number);
            if (!Attributes.IsValid(findCard)) {
              this._cardRepository.Save(_card)
                .then(result => {
                  resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Cartão', result));
                })
                .catch(error => {
                  resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cartão', error));
                });
            } else {
              resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Cartão'));
            }
          }
        });
    });
  }

  @httpGet('/card')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpPut('/card')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _card = new Card(req.body);
      this._cardRepository.Update(_card)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Cartão', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cartão', error));
        });
    });
  }

  @httpDelete('/card')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

}

export default CardController;