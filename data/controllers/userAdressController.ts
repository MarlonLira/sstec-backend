import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IUserAdressController from "../interfaces/IControllers/IUserAdressController";
import IUserAdressRepository from '../interfaces/IRepositories/IUserAdressRepository';
import UserAdress from "../models/userAdress";
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof UserAdressController
   */
  @httpPost('/userAdress')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    const _userAdress = new UserAdress(req.body.userAdress);
    return new Promise((resolve) => {
      this._userAdressRepository.Save(_userAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Endereço do usuário', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço do usuário', error));
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
      const _userAdress = new UserAdress(req.params);
      this._userAdressRepository.GetByUserId(_userAdress.userId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Endereço do usuário', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço do usuário', error));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof UserAdressController
   */
  @httpPut('/userAdress')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _userAdress = new UserAdress(req.body.userAdress);
      this._userAdressRepository.Update(_userAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Endereço do usuário', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço do usuário', error));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof UserAdressController
   */
  @httpDelete('/userAdress/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _userAdressId: number = req.params.id;
      this._userAdressRepository.Delete(_userAdressId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Endereço do usuário', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço do usuário', error));
        });
    });
  }
}

export default UserAdressController;