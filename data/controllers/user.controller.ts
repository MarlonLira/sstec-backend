import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import IUserRepository from '../interfaces/IRepositories/userRepository.interface';
import User from "../models/user.model";
import Attributes from '../../commons/core/attributes';
import Crypto from '../../commons/core/crypto';
import { CryptoType } from "../../commons/enums/cryptoType";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";

@controller('')
class UserController {

  /**
   * Creates an instance of UserController.
   * @author Marlon Lira
   * @param {IUserRepository} userRepository
   * @memberof UserController
   */
  constructor(@inject(TYPES.IUserRepository) private _userRepository: IUserRepository) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof UserController
   */
  @httpPost('/user')
  Save(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _user = new User(req.body.user);
      this._userRepository.GetByRegistryCode(_user.registryCode)
        .then(found => {
          if (!Attributes.IsValid(found)) {
            _user.password = Attributes.IsValid(_user.password) ? Crypto.Encrypt(_user.password, CryptoType.PASSWORD) : undefined;
            this._userRepository.Save(_user)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Usuário', result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Usuário', error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Usuário'));
          }
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof UserController
   */
  @httpGet('/user/registryCode/:registryCode')
  @httpGet('/user/id/:id')
  Search(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _user = new User(req.params);
      if (Attributes.IsValid(_user.registryCode)) {
        this._userRepository.GetByRegistryCode(_user.registryCode)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Usuário', result));
          });
      } else if (Attributes.IsValid(_user.id)) {
        this._userRepository.GetById(_user.id)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Usuário', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Not_Found, 'Usuário'));
      }
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof UserController
   */
  @httpGet('/users')
  SearchAll(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this._userRepository.ToList().then(result => {
        resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Usuário', result));
      });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  @httpPut('/user')
  Update(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _user = new User(req.body.user);
      this._userRepository.Update(_user)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Usuário', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Usuário', error));
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  @httpDelete('/user/:id')
  Delete(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _user = new User(req.params);
      if (Attributes.IsValid(_user.id)) {
        this._userRepository.Delete(_user.id)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Usuário', result));
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Usuário', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Usuário'));
      }
    });
  }
}

export default UserController;