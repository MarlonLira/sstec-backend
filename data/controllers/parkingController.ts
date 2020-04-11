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
import Company from "../models/company";

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
  @httpPost('/parking')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _parking = new Parking(req.body.parking);
      let _companyId = req.body.company.Id;
      this._parkingRepository.Save(_parking, _companyId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Estacionamento cadastrasdo com sucesso!', ParkingController, result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', ParkingController, error))
        })
    })
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  @httpGet('/parking/registryCode/:registryCode')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _registryCode: string = req.params.registryCode;
      this._parkingRepository.GetByRegistryCode(_registryCode)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Encontrado!', ParkingController, result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  @httpGet('/parkings')
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
  @httpPut('/parking')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _parking = new Parking(req.body);
      this._parkingRepository.Update(_parking)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Estacionamento atualizado com sucesso!', ParkingController, result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', ParkingController, error));
        })
    })
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingController
   */
  @httpDelete('/parking/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _id: number =  req.params.id;
      this._parkingRepository.Delete(_id)
        .then(result =>{
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Estacionamento deletado com sucesso!', ParkingController, result))
        })
        .catch(error =>{
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
  }
}

export default ParkingController;