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
import { CryptoType } from "../../commons/enums/cryptoType";
import Crypto from '../../commons/core/crypto';

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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CardController
   */
  @httpPost('/card')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _card = new Card(req.body.card);
      this._cardRepository.GetByUserId(_card.userId)
        .then((foundCards: Card[]) => {
          if (!Attributes.IsValid(foundCards)) {
            _card.number = Crypto.Encrypt(_card.number, CryptoType.CARD);
            _card.expirationDate = Crypto.Encrypt(_card.expirationDate, CryptoType.CARD);
            _card.secureCode = Crypto.Encrypt(_card.secureCode, CryptoType.CARD);
            this._cardRepository.Save(_card)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Cartão', result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cartão', error));
              });
          } else {
            const findCard = foundCards.find(c => Crypto.Decrypt(c.number, CryptoType.CARD) === _card.number);
            if (!Attributes.IsValid(findCard)) {
              _card.number = Crypto.Encrypt(_card.number, CryptoType.CARD);
              _card.expirationDate = Crypto.Encrypt(_card.expirationDate, CryptoType.CARD);
              _card.secureCode = Crypto.Encrypt(_card.secureCode, CryptoType.CARD);
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CardController
   */
  @httpGet('/cards/userId/:userId')
  @httpGet('/card/id/:id')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    const _card = new Card(req.params);
    return new Promise((resolve) => {
      if (Attributes.IsValid(_card.userId)) {
        this._cardRepository.GetByUserId(_card.userId)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Cartão', result));
          });
      } else if (Attributes.IsValid(_card.id)) {
        this._cardRepository.GetById(_card.id)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Cartão', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Cartão'));
      }
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CardController
   */
  @httpPut('/card')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _card = new Card(req.body.card);
      this._cardRepository.Update(_card)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Cartão', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cartão', error));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CardController
   */
  @httpDelete('/card/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _cardId: number = req.params.id;
      this._cardRepository.Delete(_cardId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Cartão', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Cartão', error));
        });
    });
  }

}

export default CardController;