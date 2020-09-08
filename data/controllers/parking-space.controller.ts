import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ParkingSpace from "../models/parking-space.model";
import TYPES from '../types';
import Attributes from "../../commons/core/attributes";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingSpaceService } from "../interfaces/IServices/parkingSpaceService.interface";

@controller('')
class ParkingSpaceController {

  constructor(@inject(TYPES.IParkingSpaceService) private service: IParkingSpaceService) { }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpPost('/parkingSpace')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingSpace(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Vaga', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Vaga')));
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
        this._parkingSpaceRepository.getById(_parkingSpace.id)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Vaga', result))
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Vaga', error));
          });
      } else if (Attributes.IsValid(_parkingSpace.parkingId)) {
        this._parkingSpaceRepository.toGroupedList(_parkingSpace)
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
      this._parkingSpaceRepository.getByParkingId(_parkingSpace.parkingId)
        .then((parkingSpaces: ParkingSpace[]) => {
          const foundParkingSpaces = parkingSpaces.filter(ps => ps.type === _parkingSpace.type);
          if (Attributes.IsValid(foundParkingSpaces)) {
            foundParkingSpaces.forEach(async (parkingspace: ParkingSpace) => {
              parkingspace.type = Attributes.ReturnIfValid(_parkingSpace.type);
              parkingspace.value = Attributes.ReturnIfValid(_parkingSpace.value);
              await this._parkingSpaceRepository.update(parkingspace);
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
        this._parkingSpaceRepository.deleteGroupType(parkingSpace)
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