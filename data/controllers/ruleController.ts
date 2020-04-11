import { Response, Request } from 'express';
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import IRuleController from '../interfaces/IControllers/IRuleController';
import IRuleRepository from '../interfaces/IRepositories/IRuleRepository';
import Attributes from '../../commons/core/attributes';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import Rule from '../models/rule';



/**
 * @description
 * @author Marlon Lira
 * @class RuleController
 * @implements {IRuleController}
 */
@controller('')
class RuleController implements IRuleController {

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
    return new Promise((resolve, reject) => {
      let _rule = new Rule(req.body);
      this._ruleRepository.Save(_rule)
        .then((ruleId: number) => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Nivel de acesso cadastrado com sucesso!', RuleController, ruleId))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, 'Erro desconhecido, por favor reporte a equipe técnica!', RuleController))
        })


    })
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