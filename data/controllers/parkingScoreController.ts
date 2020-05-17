import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut, results } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingScoreController from "../interfaces/IControllers/IParkingScoreController";
import IParkingScoreRepository from '../interfaces/IRepositories/IParkingScoreRepository';
import ParkingScore from "../models/parkingScore";
import TYPES from '../types';
import Attributes from "../../commons/core/attributes";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Parking from "../models/parking";

/**
 * @description
 * @author Emerson Souza
 * @class ParkingScoreController
 * @implements {IParkingScoreController}
 */
@controller('')
class ParkingScoreController implements IParkingScoreController {

  constructor(@inject(TYPES.IParkingScoreRepository) private _parkingScoreRepository: IParkingScoreRepository) { }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  @httpPost('/parkingScore')
  Save(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingScore = new ParkingScore(req.body.parkingScore);
      this._parkingScoreRepository.Save(_parkingScore)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Avaliação', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Avaliação', error));
        });
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
  @httpGet('/parkingScore/parkingScoreId/:id')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingScoreId = req.params.id;
      this._parkingScoreRepository.GetById(_parkingScoreId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Avaliação', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Avaliação', error));
        });
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
  SearchAll(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      const _parkingId: number = Number(req.params.parkingId);
      if (Attributes.IsValid(_parkingId)) {
        this._parkingScoreRepository.ToList(_parkingId)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Avaliação', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Estacionamento'));
      }
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
  @httpPut('/parkingScore')
  Update(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingScore = new ParkingScore(req.body.parkingScore);
      this._parkingScoreRepository.GetById(_parkingScore.id)
        .then((parkingScore: ParkingScore) => {
          if (Attributes.IsValid(parkingScore)) {
            this._parkingScoreRepository.Update(_parkingScore)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Avaliação', result))
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Avaliação', error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Avaliação'))
          }
        });
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
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _parkingScoreId: number = req.params.id;
      this._parkingScoreRepository.Delete(_parkingScoreId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Avaliação', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Avaliação', error));
        });
    });
  }  
}

export default ParkingScoreController;