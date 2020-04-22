import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IUserAdressController from "../interfaces/IControllers/IUserAdressController";
import IUserAdressRepository from '../interfaces/IRepositories/IUserAdressRepository';
import UserAdress from "../models/userAdress";
import User from "../models/user";
import Attributes from "../../commons/core/attributes";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Gustavo Gusmão
 * @class UserAdressController
 * @implements {IUserAdressController}
 */
@controller('')
class UserAdressController implements IUserAdressController {

  /**
   * Creates an instance of UserAdressController.
   * @author Gustavo Gusmão
   * @param {IUserAdressRepository} _userAdressRepository
   * @memberof UserAdressController
   */
  constructor(@inject(TYPES.IUserAdressRepository) private _userAdressRepository: IUserAdressRepository) { }

  @httpPost('/userAdress')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    const _userAdress = new UserAdress(req.body.userAdress);
    return new Promise((resolve) => {
      this._userAdressRepository.Save(_userAdress)
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
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof UserAdressController
   */
  @httpGet('/userAdress/userId/:userId')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _userId: number = req.params.userId;
      this._userAdressRepository.GetByUserId(_userId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Endereço da empresa', result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }

  @httpPut('/userAdress')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _userAdress = new UserAdress(req.body.userAdress);
      this._userAdressRepository.Update(_userAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Endereço da empresa', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }

  @httpDelete('/userAdress/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _userAdressId: number = req.params.id;
      this._userAdressRepository.Delete(_userAdressId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Endereço da empresa', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }
}

export default UserAdressController;