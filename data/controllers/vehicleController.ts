import { Response, Request } from "express";
import { controller, httpPost, request, response, httpGet, httpDelete, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IVehicleController from "../interfaces/IControllers/IVehicleController";
import IVehicleRepository from '../interfaces/IRepositories/IVehicleRepository';
import TYPES from '../types';
import Vehicle from "../models/vehicle";
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
   * Creates an instance of VehicleController.
   * @author Marlon Lira
   * @param {IVehicleRepository} _vehicleRepository
   * @param {IUserRepository} _userRepository
   * @memberof VehicleController
   */
  constructor(@inject(TYPES.IVehicleRepository) private _vehicleRepository: IVehicleRepository) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof VehicleController
   */
  @httpPost('/vehicle')
  Save(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise(async (resolve) => {
      const _vehicle = new Vehicle(req.body.vehicle);
      this._vehicleRepository.GetByUserId(_vehicle.userId)
        .then((foundVehicles: Vehicle[]) => {
          if (foundVehicles.length > 0) {
            const foundVehicle = foundVehicles.find(v => v.licensePlate === _vehicle.licensePlate);
            if (!Attributes.IsValid(foundVehicle)) {
              this._vehicleRepository.Save(_vehicle)
                .then(result => {
                  resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Veículo', result));
                })
                .catch(error => {
                  resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veículo', error));
                })
            } else {
              resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Veículo'));
            }
          } else {
            this._vehicleRepository.Save(_vehicle)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Veículo', result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veículo', error));
              });
          }
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof VehicleController
   */
  @httpGet('/vehicle/licensePlate/:licensePlate')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _licensePlate = req.params.licensePlate;
      this._vehicleRepository.GetByLicensePlate(_licensePlate)
        .then((foundVehicle: Vehicle) => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Veículo', foundVehicle));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veículo', error));
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof VehicleController
   */
  @httpGet('/vehicles/userId/:id')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _userId = req.params.id;
      this._vehicleRepository.GetByUserId(_userId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Veículo', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veículo', error));
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof VehicleController
   */
  @httpPut('/vehicle')
  Update(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _vehicle = new Vehicle(req.body.vehicle);
      if (Attributes.IsValid(_vehicle.id)) {
        this._vehicleRepository.Update(_vehicle)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Veículo', result));
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veículo', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Veículo'));
      }
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof VehicleController
   */
  @httpDelete('/vehicles/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _vehicleId = req.params.id;
      this._vehicleRepository.Delete(_vehicleId)
        .then(() => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Veículo'))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Veículo', error));
        });
    });
  }
}

export default VehicleController;