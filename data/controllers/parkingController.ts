import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingController from "../interfaces/IControllers/IParkingController";
import IParkingRepository from '../interfaces/IRepositories/IParkingRepository';
import Parking from "../models/parking";
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
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpGet('/parking/companyId/:companyId/registryCode/:registryCode')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise(async (resolve) => {
      try {
        const _parking = new Parking(req.params);
        let found: any = null;
          if (Attributes.IsValid(_parking.registryCode) && Attributes.IsValid(_parking.companyId)) {
            found = await this._parkingRepository.GetByRegistryCode(_parking.registryCode);
            found = found.find(r => r.companyId === Number(_parking.companyId));
            resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Estacionameto', found))
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Estacionamento', found));
          }
      } catch(error) {
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
      }
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
  @httpGet('/parkings/companyId/:companyId')
  SearchAll(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      const _companyId: number = Number(req.params.companyId);
      if (Attributes.IsValid(_companyId)) {
        this._parkingRepository.ToList(_companyId)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Veículo'));
      }
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