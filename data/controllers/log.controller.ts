import { Response, Request } from 'express';
import { controller, httpGet, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from '../../commons/enums/httpMessage';
import { ILogService } from '../interfaces/IServices/logService.interface';
import { Log } from '../models/log.model';

@controller('')
class LogController {

  constructor(@inject(TYPES.ILogService) private service: ILogService) { }

  @httpPost('/log')
  post(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.save(new Log(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Log', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Log')));
    });
  }

  @httpGet('/logs/:companyId')
  getAll(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.toList(Number(req.params.companyId))
        .then((result: Log[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Log', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Log')));
    });
  }
}

export default LogController;