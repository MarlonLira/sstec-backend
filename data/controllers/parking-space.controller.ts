import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingSpaceController from "../interfaces/IControllers/IParkingSpaceController";
import IParkingSpaceRepository from '../interfaces/IRepositories/parking-spaceRepository.interface';
import ParkingSpace from "../models/parkingSpace.model";
import TYPES from '../types';
import Attributes from "../../commons/core/attributes";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { TransactionType } from "../../commons/enums/transactionType";

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
        if (Attributes.IsValid(_parkingSpace.amount)) {
          const listEx: ParkingSpace[] = (await this._parkingSpaceRepository.GetDeletedByParkingId(_parkingSpace));
          const rest = _parkingSpace.amount - listEx.length;
          if (Attributes.IsValid(listEx)) {
            listEx.forEach(async (foundParkingSpace: ParkingSpace) => {
              foundParkingSpace.value = _parkingSpace.value;
              foundParkingSpace.status = TransactionType.ACTIVE;
              this._parkingSpaceRepository.Update(foundParkingSpace);
              result.push(foundParkingSpace.id);
            });
          }
          if (listEx.length < _parkingSpace.amount) {
            for (let i = 0; i < rest; i++) {
              result.push(await this._parkingSpaceRepository.Save(_parkingSpace));
            };
          }
          await this.UpdateAll(_parkingSpace);
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Vaga', result));
        } else {
          resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Vaga'));
        }
      } catch (error) {
        resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
      };
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
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
        this._parkingSpaceRepository.ToGroupedList(_parkingSpace)
          .then((foundParkingSpaces: ParkingSpace[]) => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Vagas', foundParkingSpaces))
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
      if (Attributes.IsValid(_parkingSpace.parkingId)) {
        this.UpdateAll(_parkingSpace)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Vaga', result));
          }).catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
          })
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Vaga'));
      }
    });
  }

  private UpdateAll(_parkingSpace: ParkingSpace) {
    return new Promise((resolve) => {
      const result = [];
      this._parkingSpaceRepository.GetByParkingId(_parkingSpace.parkingId)
        .then((parkingSpaces: ParkingSpace[]) => {
          const foundParkingSpaces = parkingSpaces.filter(ps => ps.type === _parkingSpace.type);
          if (Attributes.IsValid(foundParkingSpaces)) {
            foundParkingSpaces.forEach(async (parkingspace: ParkingSpace) => {
              parkingspace.type = Attributes.ReturnIfValid(_parkingSpace.type);
              parkingspace.value = Attributes.ReturnIfValid(_parkingSpace.value);
              await this._parkingSpaceRepository.Update(parkingspace);
              result.push(parkingspace.id);
            });
          }
          resolve(result);
        });
    });
  }

  /**
   * @description
   * @author Felipe Seabra 
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceRepository
   */
  @httpDelete('/parkingSpace/parkingId/:parkingId/type/:type/amount/:amount')
  Delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      const parkingSpace = new ParkingSpace(req.params);
          if (Attributes.IsValid(parkingSpace)) {
            this._parkingSpaceRepository.DeleteGroupType(parkingSpace)
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
  }
}

export default ParkingSpaceController;