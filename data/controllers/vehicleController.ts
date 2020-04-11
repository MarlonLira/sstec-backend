import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import TYPES from '../types';
import Vehicle from "../models/Vehicle";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import Attributes from '../../commons/core/attributes';
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
    return new Promise((resolve, reject) => {
      console.log(req.body)
      let _vehicle = new Vehicle(req.body.vehicle);
      let _userId: number = req.body.user.id;
      this._VehicleRepository.Find(_vehicle.licensePlate, _userId)
        .then(found => {
          if (!Attributes.IsValid(found)) {
            this._VehicleRepository.Save(_vehicle, _userId)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, 'Veículo criado com sucesso!', VehicleController, result));
              }).catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', VehicleController, error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, 'Já existe um cadastro desse veículo para o usuário!', VehicleController));

          }
        }).catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', VehicleController, error));
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
  @httpPost('/vehicles/user/:id')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve, reject) => {
      console.log(req.params)
      let _userId = req.params.id;
      this._VehicleRepository.GetVehicles(_userId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, '', VehicleController, result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', VehicleController, error));
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