import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject, id } from "inversify";
import IParkingAdressController from "../interfaces/IControllers/IParkingAdressController";
import IParkingAdressRepository from '../interfaces/IRepositories/IParkingAdressRepository';
import ParkingAdress from "../models/parkingAdress";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";


/**
 * @description
 * @author Felipe Seabra
 * @class ParkingAdressController
 * @implements {IParkingAdressController}
 */
@controller('')
class ParkingAdressController implements IParkingAdressController{

  /**
   *Creates an instance of ParkingPromotionController.
   * @author Felipe Seabra
   * @param {IParkingAdressRepository} _parkingAdressRepository
   * @memberof ParkingAdressController
   */
  constructor(@inject(TYPES.IParkingAdressRepository) private _parkingAdressRepository: IParkingAdressRepository) { }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingAdressController
   */
  @httpGet('/parkingAdress/Search/:id')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._parkingAdressRepository.GetById(_id)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Endereço', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço', error));
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingAdressController
   */
  @httpPost('/parkingAdress')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _parkingAdress = new ParkingAdress(req.body.parkingAdress);
      _parkingAdress.parkingId  = req.body.parking.id;
      this._parkingAdressRepository.Save(_parkingAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Endereço', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço', error));
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingAdressController
   */
  @httpGet('/ParkingsAdress/SearchAll')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this._parkingAdressRepository.ToList()
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Endereço', result));
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingAdressController
   */
  @httpPut('/ParkingAdress/Update')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _parkingAdress = new ParkingAdress(req.body);
      this._parkingAdressRepository.Update(_parkingAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Endereço', result));
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof ParkingAdressController
   */
  @httpDelete('/ParkingAdress/Delete/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._parkingAdressRepository.Delete(_id)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Endereço', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço', error));
        });
    });
  }
}

export default ParkingAdressController;