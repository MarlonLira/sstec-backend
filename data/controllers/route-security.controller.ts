import { Response, Request } from 'express';
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from '../../commons/enums/httpMessage';
import { IRouteSecurityService } from '../interfaces/IServices/route-securityService.interface';
import { RouteSecurity } from '../models/route-security.model';
import { safetyMiddleware } from '../../middleware/safety/safety.config';

@controller('', safetyMiddleware())
class RouteSecurityController {

  constructor(@inject(TYPES.IRouteSecurityService) private service: IRouteSecurityService) { }

  @httpPost('/routeSecurity')
  save(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.save(new RouteSecurity(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Route Security', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/routeSecurity/:id')
  getById(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: RouteSecurity) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Route Security', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));

    });
  }

  @httpGet('/routeSecurity/name/:name')
  getByName(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.getByName(String(req.params.name))
        .then((result: RouteSecurity[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Route Security', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/routeSecurity')
  getAll(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.toList()
        .then((result: RouteSecurity[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Route Security', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/routeSecurity/companyId/:companyId')
  getByCompanyId(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.getByCompanyId(Number(req.params.companyId))
        .then((result: RouteSecurity[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Route Security', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpPut('/routeSecurity')
  update(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.update(new RouteSecurity(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Route Security', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpDelete('/routeSecurity/:id')
  delete(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Route Security', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }
}

export default RouteSecurityController;