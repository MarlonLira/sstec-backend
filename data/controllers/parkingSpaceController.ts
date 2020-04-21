import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut, results } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingSpaceController from "../interfaces/IControllers/IParkingSpaceController";
import IParkingSpaceRepository from '../interfaces/IRepositories/IParkingSpaceRepository';
import ParkingSpace from "../models/ParkingSpace";
import Parking from "../models/Parking";
import TYPES from '../types';
import Attributes from "../../commons/core/attributes";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";


/**
 * @description
 * @author Emerson Souza
 * @class ParkingSpaceController
 * @implements {IParkingSpaceController}
 */
@controller('')
class ParkingSpaceController implements IParkingSpaceController {

  /**
   *Creates an instance of ParkingSpaceController.
   * @author Emerson Souza
   * @param {IParkingSpaceRepository} _parkingSpaceRepository
   * @memberof ParkingSpaceController
   */
  constructor(@inject(TYPES.IParkingSpaceRepository) private _parkingSpaceRepository: IParkingSpaceRepository) { }


  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpPost('/parkingSpace')
  Save(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      let _parkingSpace = new ParkingSpace(req.body.parkingSpace);
      this._parkingSpaceRepository.Save(_parkingSpace)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
        })
    })
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpGet('/parkingSpace')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingSpace: number = req.params.Id;
      this._parkingSpaceRepository.GetByParkingSpaceId(_parkingSpace)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result))
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
   * @memberof ParkingSpaceController
   */
  @httpPut('/parkingSpace')
  Update(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingSpace = new ParkingSpace(req.body.parkingSpace);
      this._parkingSpaceRepository.GetByParkingSpaceId(_parkingSpace.id)
        .then((parkingSpace: ParkingSpace) => {
          if (Attributes.IsValid(parkingSpace)) {
            this._parkingSpaceRepository.Update(_parkingSpace)
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
   * @memberof ParkingSpaceController
   */
  @httpDelete('/parkingSpace/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._parkingSpaceRepository.GetByParkingSpaceId(_id)
        .then((parkingSpace: ParkingSpace) => {
          if (Attributes.IsValid(parkingSpace)) {
            this._parkingSpaceRepository.Delete(_id)
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

export default ParkingSpaceController;