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
import IUserRepository from "../interfaces/IRepositories/IUserRepository";
import User from "../models/user";
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
   *Creates an instance of CardController.
   * @author Marlon Lira
   * @param {ICardRepository} _cardRepository
   * @param {IUserRepository} _userRepository
   * @memberof CardController
   */
  constructor(
    @inject(TYPES.ICardRepository) private _cardRepository: ICardRepository,
    @inject(TYPES.IUserRepository) private _userRepository: IUserRepository
  ) { }

  @httpPost('/card')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    let _card = new Card(req.body.card);
    let _userId = req.body.user.id;
    return new Promise((resolve) => {
      this._userRepository.GetById(_userId)
        .then((userFound: User) => {
          if (Attributes.IsValid(userFound)) {
            this._cardRepository.Find(_card, ['number', 'flag'], 'Equal')
              .then(async (cardFound: Card) => {
                if (!Attributes.IsValid(cardFound)) {
                  this._cardRepository.Save(_card, _userId)
                    .then(result => {
                      resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Cartão', result));
                    })
                    .catch(error => {
                      resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Empty, 'Cartão', error));
                    });
                } else {
                  await userFound.getCards()
                    .then((cardsFound: Card[]) => {
                      cardsFound.forEach(cardF => {
                        this._cardRepository.Find(cardF, ['number', 'flag'], 'Equal')
                          .then(cFound => {
                            if (Attributes.IsValid(cFound)) {
                              resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Cartão'));
                            }
                          });
                      });
                    });
                  this._cardRepository.SaveInUser(cardFound, userFound)
                    .then(result => {
                      resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Cartão', result))
                    }).catch(error => {
                      resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Usuário', error))
                    })
                }
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Usuário'))
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
      let _card = new Card(req.body);
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