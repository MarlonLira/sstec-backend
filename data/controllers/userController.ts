import { Response, Request } from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IUserRepository from '../interfaces/IUserRepository';
import { User } from "../models/User";
import TYPES from '../types/userTypes';
import { Attributes, Crypto } from '../../commons/Helpers';
import { Http } from '../../commons/Http';
import { HttpCode } from '../../commons/enums/HttpCode';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class UserController
 * @implements {interfaces.Controller}
 */
@controller('')
export default class UserController implements interfaces.Controller {


  /**
   * @description
   * @type {IUserRepository}
   * @memberof UserController
   */
  readonly _userRepository: IUserRepository;

  /**
   *Creates an instance of UserController.
   * @author Marlon Lira
   * @param {IUserRepository} userRepository
   * @memberof UserController
   */
  constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

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
    let _user = new User(req.body);
    return new Promise((resolve, reject) => {
      this._userRepository.Find(_user, ['registryCode', 'email'])
        .then(found => {
          if (!Attributes.IsValid(found)) {
            _user.password = Attributes.IsValid(_user.password) ? Crypto.Encrypt(_user.password) : undefined;
            this._userRepository.Save(_user)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, 'Usuario criado com sucesso!', UserController, result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', UserController, error));
              });
          } else {
            resolve(Http.SendMessage(res, HttpCode.Bad_Request, 'Já existe um cadastro para o usuário!', UserController));
          }
        })
    })
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
    let _user = new User(req.params);
    console.log(req.params)
    return new Promise((resolve, reject) => {
      this._userRepository.Find(_user, ['registryCode', 'id'])
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, '', UserController, result));
        });
    })
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
    return new Promise((resolve, reject) => {
      this._userRepository.ToList().then(result => {
        resolve(Http.SendMessage(res, HttpCode.Ok, '', UserController, result));
      });
    })
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
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  @httpDelete('/user')
  Delete(@request() req: Request, @response() res: Response) {
    throw new Error("Method not implemented.");
  }
}