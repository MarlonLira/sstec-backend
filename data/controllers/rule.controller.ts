import { Response, Request } from 'express';
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { Http } from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { Rule } from '../models/rule.model';
import { HttpMessage } from '../../commons/enums/httpMessage';
import { IRuleService } from '../interfaces/IServices/ruleService.interface';
import { safetyMiddleware } from '../../middleware/safety/safety.config';

@controller('', safetyMiddleware())
class RuleController {

  constructor(@inject(TYPES.IRuleService) private service: IRuleService) { }

  @httpPost('/rule')
  save(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.save(new Rule(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Nivel de Acesso', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Nivel de Acesso')));
    });
  }

  @httpGet('/rule/id/:id')
  searchById(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: Rule) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Nivel de Acesso', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Nivel de Acesso')));

    });
  }

  @httpGet('/rule/name/:name')
  searchByName(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.getByName(String(req.params.name))
        .then((result: Rule[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Nivel de Acesso', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Nivel de Acesso')));
    });
  }

  @httpGet('/rules')
  searchAll(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.toList()
        .then((result: Rule[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Nivel de Acesso', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Nivel de Acesso')));
    });
  }

  @httpPut('/rule')
  update(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.update(new Rule(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Nivel de Acesso', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Nivel de Acesso')));
    });
  }

  @httpDelete('/rule/:id')
  delete(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Nivel de Acesso', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Nivel de Acesso')));
    });
  }
}

export default RuleController;