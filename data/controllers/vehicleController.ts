import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import IVehicleController from "../interfaces/IControllers/IVehicleController";
import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import TYPES from '../types';
import Vehicle from "../models/Vehicle";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from '../../commons/core/attributes';

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
      const _vehicle = new Vehicle(req.body.vehicle);
      const _userId: number = req.body.user.id;
      this._VehicleRepository.Find(_vehicle.licensePlate, _userId)
        .then(found => {
          if (!Attributes.IsValid(found)) {
            this._VehicleRepository.Save(_vehicle, _userId)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Veiculo', result));
              }).catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veiculo', error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Veiculo'));

          }
        }).catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veiculo', error));
        });
    });
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
  @httpPost('/vehicles/user/:id')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _userId = req.params.id;
      this._VehicleRepository.GetVehicles(_userId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Veiculo', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veiculo', error));
        });
    });
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