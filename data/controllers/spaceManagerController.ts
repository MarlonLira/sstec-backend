import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ISpaceManagerController from '../interfaces/IControllers/ISpaceManagerController';
import ISpaceManagerRepository from '../interfaces/IRepositories/ISpaceManagerRepository';
import SpaceManager from "../models/spaceManager";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import Attributes from "../../commons/core/attributes";
import { InnerDate, ConvertToDateTime } from "../../commons/core/innerDate";

/**
 * @description
 * @author Gustavo Gusmão
 * @class SpaceManagerController
 * @implements {ISpaceManagerController}
 */
@controller('')
class SpaceManagerController implements ISpaceManagerController {

  /**
   * Creates an instance of SpaceManagerController.
   * @author Gustavo Gusmão
   * @param {ISpaceManagerRepository} _spaceManagerRepository
   * @param {IUserRepository} _userRepository
   * @memberof SpaceManagerController
   */
  constructor(
    @inject(TYPES.ISpaceManagerRepository) private _spaceManagerRepository: ISpaceManagerRepository) { }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SpaceManagerController
   */
  @httpPost('/spaceManager')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _spaceManager = new SpaceManager(req.body.spaceManager);
      this._spaceManagerRepository.GetByParkingSpaceId(_spaceManager.parkingSpaceId)
        .then((foundSpaceManagers: SpaceManager[]) => {
          if (!Attributes.IsValid(foundSpaceManagers)) {
            this._spaceManagerRepository.Save(_spaceManager)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Agendamento', result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
              });
          } else {
              resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Already_Exists, 'Agendamento', resolve));
            }
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SpaceManagerController
   */
  @httpGet('/spaceManagers/userId/:userId')
  @httpGet('/spaceManager/id/:id')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    const _spaceManager = new SpaceManager(req.params);
    return new Promise((resolve) => {
      if (Attributes.IsValid(_spaceManager.parkingSpaceId)) {
        this._spaceManagerRepository.GetByParkingSpaceId(_spaceManager.parkingSpaceId)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento', result));
          });
      } else if (Attributes.IsValid(_spaceManager.id)) {
        this._spaceManagerRepository.GetById(_spaceManager.id)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Agendamento', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Agendamento'));
      }
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SpaceManagerController
   */
  @httpPut('/spaceManager')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _spaceManager = new SpaceManager(req.body.spaceManager);
      this._spaceManagerRepository.Update(_spaceManager)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Agendamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof SpaceManagerController
   */
  @httpDelete('/spaceManager/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _spaceManagerId: number = req.params.id;
      this._spaceManagerRepository.Delete(_spaceManagerId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Agendamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Agendamento', error));
        });
    });
  }

}

export default SpaceManagerController;