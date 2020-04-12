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

/**
 * @description
 * @author Felipe Seabra
 * @class ParkingPromotionController
 * @implements {IParkingPromotionController}
 */
@controller('')
class ParkingPromotionController implements IParkingPromotionController {

  /**
   *Creates an instance of ParkingPromotionController.
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
  @httpGet('/parkingPromotion/Search/:name')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _name: string = req.params.name;
      this._parkingPromotionRepository.GetByName(_name)
        .then(result => {
          console.log(_name);
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
        })
        .catch(error => {
          console.log(_name);
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
  @httpPost('/parkingPromotion')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _parkingPromotion = new ParkingPromotion(req.body.parkingPromotion);
      let _parkingId = req.body.parking.id;
      this._parkingPromotionRepository.Save(_parkingPromotion, _parkingId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
        })
        .catch(error => {
          console.log(error);
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
  @httpGet('/ParkingsPromotion/SearchAll')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this._parkingPromotionRepository.ToList()
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
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
  @httpPut('/ParkingPromotion/Update')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _parkingPromotion = new ParkingPromotion(req.body);
      this._parkingPromotionRepository.Update(_parkingPromotion)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
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
  @httpDelete('/ParkingPromotion/Delete/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _id: number = req.params.id;
      this._parkingPromotionRepository.Delete(_id)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Promoção', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Promoção', error));
        });
    });
  }
}

export default ParkingPromotionController;