import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { User } from "../models/user.model";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IUserService } from "../interfaces/IServices/userService.interface";

@controller('')
class UserController {

  constructor(@inject(TYPES.IUserService) private service: IUserService) { }

  @httpPost('/user')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new User(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'User', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'User')));
    });
  }

  @httpGet('/user/registryCode/:registryCode')
  getByRegistryCode(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByRegistryCode(req.params.registryCode)
        .then((result: User[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'User', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'User')));
    });
  }

  @httpGet('/user/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: User) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'User', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'User')));
    });
  }

  @httpPut('/user')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new User(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'User', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'User')));
    });
  }

  @httpDelete('/user/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }
}

export default UserController;