import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import TYPES from '../types';
import Vehicle from "../models/Vehicle";
import { Http } from '../../commons/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { Attributes, Crypto } from '../../commons/helpers';
import IVehicleController from "../interfaces/IControllers/IVehicleController";

/**
 * @description
 * @author Marlon Lira
 * @class VehicleController
 * @implements {IVehicleController}
 */
@controller('')
class VehicleController implements IVehicleController {

  /**
   *Creates an instance of VehicleController.
   * @author Marlon Lira
   * @param {IVehicleRepository} _VehicleRepository
   * @memberof VehicleController
   */
  constructor(@inject(TYPES.IVehicleRepository) private _VehicleRepository: IVehicleRepository) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns 
   * @memberof VehicleController
   */
  @httpPost('/vehicle')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _vehicle = new Vehicle(req.body);
      this._VehicleRepository.Save(_vehicle)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, '', Vehicle, result));
        }).catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', Vehicle));
        })

    })
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof VehicleController
   */
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof VehicleController
   */
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof VehicleController
   */
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof VehicleController
   */
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

}

export default VehicleController;