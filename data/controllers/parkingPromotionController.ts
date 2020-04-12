import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut, results } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingPromotionController from "../interfaces/IControllers/IParkingPromotionController";
import IParkingPromotionRepository from '../interfaces/IRepositories/IParkingPromotionRepository';
import ParkingPromotion from "../models/parkingPromotion";
import TYPES from '../types';
import Attributes from '../../commons/core/attributes';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { promises, resolve } from "dns";


/**
 * @description
 * @author Felipe Seabra
 * @class ParkingPromotionController
 * @implements {IParkingPromotionController}
 */
@controller('')
class ParkingPromotionController implements IParkingPromotionController {

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
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Encontrado', ParkingPromotionController, result));
        })
        .catch(error => {
          console.log(_name);
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
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
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Promoção cadastrada com sucesso', ParkingPromotionController))
        })
        .catch(error => {
          console.log(error);
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
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
    return new Promise((resolve, reject) => {
      this._parkingPromotionRepository.ToList()
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, '', ParkingPromotionController, result));
        })
    })
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
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Promoção atualizada com sucesso', ParkingPromotionController, result));
        })
    })
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
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Promoção deletada com sucesso', ParkingPromotionController, result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
  }
}

export default ParkingPromotionController;