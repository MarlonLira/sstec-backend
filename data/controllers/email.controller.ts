import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';

import Http from '../../commons/core/http';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { HttpCode } from '../../commons/enums/httpCode';
import { IEmailService } from "../interfaces/IServices/emailService.interface";
import { Email } from "../models/email.model";

@controller('')
class EmailController {

  /**
   * Creates an instance of EmailController.
   * @author Marlon Lira
   * @param {IEmailService} service
   * @memberof EmailController
   */
  constructor(
    @inject(TYPES.IEmailService) private service: IEmailService,
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
        const result = await this.service.send(_email);
        resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Send_Successfully, 'Email', result));
      } catch (error) {
        reject(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Unknown_Error, 'Email', error));
      }
    });
  }
}

export default EmailController;