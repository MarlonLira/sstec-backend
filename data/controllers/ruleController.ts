import { Response, Request } from 'express';
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import IRuleController from '../interfaces/IControllers/IRuleController';
import IRuleRepository from '../interfaces/IRepositories/IRuleRepository';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import Rule from '../models/rule';
import { HttpMessage } from '../../commons/enums/httpMessage';
import Attributes from '../../commons/core/attributes';

/**
 * @description
 * @author Marlon Lira
 * @class RuleController
 * @implements {IRuleController}
 */
@controller('')
class RuleController implements IRuleController {

  /**
   * Creates an instance of RuleController.
   * @author Marlon Lira
   * @param {IRuleRepository} _ruleRepository
   * @memberof RuleController
   */
  constructor(@inject(TYPES.IRuleRepository) private _ruleRepository: IRuleRepository) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  @httpPost('/rule')
  Save(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _rule = new Rule(req.body.rule);
      this._ruleRepository.Save(_rule)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Nivel de Acesso', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Nivel de Acesso', error));
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  @httpGet('/rule/id/:id')
  @httpGet('/rule/name/:name')
  Search(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _rule = new Rule(req.params);
      if (Attributes.IsValid(_rule.id)) {
        this._ruleRepository.GetById(_rule.id)
          .then((result: Rule) => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Nivel de Acesso', result));
          });
      } else if (Attributes.IsValid(_rule.name)) {
        this._ruleRepository.GetByName(_rule.name)
          .then((result: Rule[]) => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Nivel de Acesso', result));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Nivel de Acesso'));
      }
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  @httpGet('/rules')
  SearchAll(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this._ruleRepository.ToList()
        .then((result: Rule[]) => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Nivel de Acesso', result));
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  @httpPut('/rule')
  Update(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _rule = new Rule(req.body.rule);
      if (Attributes.IsValid(_rule.id)) {
        this._ruleRepository.Update(_rule)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Nivel de Acesso', result));
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Nivel de Acesso', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Nivel de Acesso'));
      }
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  @httpDelete('/rule/:id')
  Delete(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _rule = new Rule(req.params);
      this._ruleRepository.Delete(_rule.id)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Nivel de Acesso', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Nivel de Acesso', error));
        });
    });
  }
}

export default RuleController;