import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingSpaceController from "../interfaces/IControllers/IParkingSpaceController";
import IParkingSpaceRepository from '../interfaces/IRepositories/IParkingSpaceRepository';
import ParkingSpace from "../models/parkingSpace";
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
   * Creates an instance of ParkingSpaceController.
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
    return new Promise(async (resolve) => {
      try {
        const _parkingSpace = new ParkingSpace(req.body.parkingSpace);
        const result = [];
        for (let i = 0; i < _parkingSpace.amount; i++) {
          result.push(await this._parkingSpaceRepository.Save(_parkingSpace));
        };
        resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento', result));
      } catch (error) {
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
      };
    });
  }

  @httpGet('/parkingSpace/id/:id')
  @httpGet('/parkingSpace/parkingId/:parkingId')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const _parkingSpace = new ParkingSpace(req.params);
      if (Attributes.IsValid(_parkingSpace.id)) {
        this._parkingSpaceRepository.GetById(_parkingSpace.id)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Vaga', result))
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
          });
      } else if (Attributes.IsValid(_parkingSpace.parkingId)) {
        this._parkingSpaceRepository.GetByParkingId(_parkingSpace.parkingId)
          .then((foundParkingSpaces: ParkingSpace[]) => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Vaga', foundParkingSpaces))
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
          });
      }
      else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Vaga'));
      }
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
      if (Attributes.IsValid(_parkingSpace.id)) {
        this._parkingSpaceRepository.GetById(_parkingSpace.id)
          .then((parkingSpace: ParkingSpace) => {
            if (Attributes.IsValid(parkingSpace)) {
              this._parkingSpaceRepository.Update(_parkingSpace)
                .then(result => {
                  resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Vaga', result))
                })
                .catch(error => {
                  resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
                });
            } else {
              resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Vaga'))
            }
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Vaga'));
      }
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
      this._parkingSpaceRepository.GetById(_id)
        .then((parkingSpace: ParkingSpace) => {
          if (Attributes.IsValid(parkingSpace)) {
            this._parkingSpaceRepository.Delete(_id)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Vaga', result))
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Vaga'));
          }
        });
    });
  }
}

export default ParkingSpaceController;