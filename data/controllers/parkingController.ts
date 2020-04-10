import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut, results } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingController from "../interfaces/IControllers/IParkingController";
import IParkingRepository from '../interfaces/IRepositories/IParkingRepository';
import Parking from "../models/Parking";
import TYPES from '../types';
import Attributes from '../../commons/core/attributes';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';

/**
 * @description
 * @author Emerson Souza
 * @class ParkingController
 * @implements {IParkingController}
 */
@controller('')
class ParkingController implements IParkingController {

  constructor(@inject(TYPES.IParkingRepository) private _parkingRepository: IParkingRepository) { }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  Search(@request() req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  @httpPost('/Parking')
  Save(@request() req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  @httpGet('/Parkings')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }
 
  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  @httpPut('/Parking')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  @httpDelete('/Parking')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }
}

export default ParkingController;