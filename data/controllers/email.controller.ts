import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';

import Http from '../../commons/core/http';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { HttpCode } from '../../commons/enums/httpCode';
import IEmailController from "../interfaces/IControllers/IEmailController";
import IEmailService from "../interfaces/IServices/emailService.interface";
import Email from "../models/email.model";


/**
 * @description
 * @author Marlon Lira
 * @class EmailController
 * @implements {IEmailController}
 */
@controller('')
class EmailController implements IEmailController {

  /**
   * Creates an instance of EmailController.
   * @author Marlon Lira
   * @param {IEmailService} _emailService
   * @memberof EmailController
   */
  constructor(
    @inject(TYPES.IEmailService) private _emailService: IEmailService,
  ) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns
   * @memberof EmailController
   */
  @httpPost('/email')
  Send(@request() req: Request, @response() res: Response) {
    return new Promise(async (resolve, reject) => {
      const _email = new Email(req.body);
      try {
        const result = await this._emailService.Send(_email);
        resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Send_Successfully, 'Email', result));
      } catch (error) {
        reject(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Unknown_Error, 'Email', error));
      }
    });
  }


}

export default EmailController;