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
      const _rule = new Rule(req.body);
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
  Search(@request() req: Request, @response() res: Response) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  SearchAll(@request() req: Request, @response() res: Response) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  Update(@request() req: Request, @response() res: Response) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @memberof RuleController
   */
  Delete(@request() req: Request, @response() res: Response) {
    throw new Error("Method not implemented.");
  }
}

export default RuleController;