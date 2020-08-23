import { Response, Request } from 'express';
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from '../../commons/enums/httpMessage';
import { ILogService } from '../interfaces/IServices/logService.interface';
import { Log } from '../models/log.model';

/**
 * @description
 * @author Marlon Lira
 * @class RuleController
 */
@controller('')
class LogController {

  /**
   * Creates an instance of RuleController.
   * @author Marlon Lira
   * @param {IRuleService} service
   * @memberof RuleController
   */
  constructor(@inject(TYPES.ILogService) private service: ILogService) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof RuleController
   */
  @httpPost('/log')
  save(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.save(new Log(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Log', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Log')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof RuleController
   */
  @httpGet('/logs/:companyId')
  searchAll(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.toList(Number(req.params.companyId))
        .then((result: Log[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Log', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Log')));
    });
  }
}

export default LogController;