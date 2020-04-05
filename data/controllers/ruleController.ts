import { Response, Request } from 'express';
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { Attributes, Crypto } from '../../commons/helpers';
import { Http } from '../../commons/http';
import { HttpCode } from '../../commons/enums/httpCode';
import IRuleController from '../interfaces/IControllers/IRuleController';

/**
 * @description
 * @author Marlon Lira
 * @class RuleController
 * @implements {IRuleController}
 */
@controller('')
class RuleController implements IRuleController {

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof RuleController
   */
  Save(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof RuleController
   */
  Search(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof RuleController
   */
  SearchAll(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof RuleController
   */
  Update(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof RuleController
   */
  Delete(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }

}