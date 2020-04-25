import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut, results } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingController from "../interfaces/IControllers/IParkingController";
import IParkingRepository from '../interfaces/IRepositories/IParkingRepository';
import Parking from "../models/Parking";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";

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
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpPost('/parking')
  Save(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parking = new Parking(req.body.parking);
      this._parkingRepository.Save(_parking)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento Cadastrado!', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
        });
    });
  }
  
 
  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpGet('/parking/registryCode/:registryCode')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _registryCode: string = req.params.registryCode;
      this._parkingRepository.GetByRegistryCode(_registryCode)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpGet('/parkings')
  SearchAll(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      this._parkingRepository.ToList()
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result));
        });
    });
  }


  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpPut('/parking')
  Update(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parking = new Parking(req.body.parking);
      this._parkingRepository.GetById(_parking.id)
        .then((parking: Parking) => {
          if (Attributes.IsValid(parking)) {
            this._parkingRepository.Update(_parking)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Estacionamento', result))
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Estacionamento'))
          }
        });
    });
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpDelete('/parking/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._parkingRepository.GetById(_id)
        .then((parking: Parking) => {
          if (Attributes.IsValid(parking)) {
            this._parkingRepository.Delete(_id)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Estacionamento', result))
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Estacionamento'));
          }
        });
    });
  }
}

export default ParkingController;