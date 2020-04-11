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
  Search(@request() req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
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
        this._parkingPromotionRepository.Save(_parkingPromotion,_parkingId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok,'Promoção cadastrada com sucesso', ParkingPromotionController))
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
  @httpGet('/ParkingsPromotion')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingPromotionController
   */
  @httpPut('/ParkingPromotion')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }


  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingPromotionController
   */
  @httpDelete('/ParkingPromotion')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }
}

export default ParkingPromotionController;