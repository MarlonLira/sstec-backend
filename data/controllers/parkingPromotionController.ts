import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingPromotionController from "../interfaces/IControllers/IParkingPromotionController";
import IParkingPromotionRepository from '../interfaces/IRepositories/IParkingPromotionRepository';
import ParkingPromotion from "../models/parkingPromotion";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";

/**
 * @description
 * @author Felipe Seabra
 * @class ParkingPromotionController
 * @implements {IParkingPromotionController}
 */
@controller('')
class ParkingPromotionController implements IParkingPromotionController {

  /**
   * Creates an instance of ParkingPromotionController.
   * @author Felipe Seabra
   * @param {IParkingPromotionRepository} _parkingPromotionRepository
   * @memberof ParkingPromotionController
   */
  constructor(@inject(TYPES.IParkingPromotionRepository) private _parkingPromotionRepository: IParkingPromotionRepository) { }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingPromotionController
   */
  @httpGet('/parkingPromotion/name/:name')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingPromotion = new ParkingPromotion(req.params);
      if (Attributes.IsValid(_parkingPromotion.name)) {
        this._parkingPromotionRepository.GetByName(_parkingPromotion.name)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Promoção', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Promoção'));
      }
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingPromotionController
   */
  @httpPost('/parkingPromotion')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _parkingPromotion = new ParkingPromotion(req.body.parkingPromotion);
      this._parkingPromotionRepository.Save(_parkingPromotion)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Promoção', error));
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingPromotionController
   */
  @httpGet('/ParkingsPromotion/:parkingId')
  SearchAll(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      const _parkingId: number = Number(req.params.parkingId);
      if (Attributes.IsValid(_parkingId)) {
        this._parkingPromotionRepository.ToList(_parkingId)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Promoção', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Estacionamento'));
      }
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingPromotionController
   */
  @httpPut('/ParkingPromotion')
  Update(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingPromotion = new ParkingPromotion(req.body.parkingPromotion);
      if (Attributes.IsValid(_parkingPromotion.id)) {
        this._parkingPromotionRepository.Update(_parkingPromotion)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Promoção'));
      }
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingPromotionController
   */
  @httpDelete('/ParkingPromotion/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._parkingPromotionRepository.GetById(_id)
        .then((parkingPromotion: ParkingPromotion) => {
          if (Attributes.IsValid(parkingPromotion)) {
            this._parkingPromotionRepository.Delete(_id)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Promoção', result))
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Promoção', error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Estacionamento'));
          }
        });
    });
  }
}

export default ParkingPromotionController;