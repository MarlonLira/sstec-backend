import { injectable, inject } from "inversify";
import * as nodemailer from 'nodemailer';
import * as Config from '../../config.json';
import { IEmailService } from "../interfaces/IServices/emailService.interface";
import Email from '../models/email.model';
import { HttpCode } from "../../commons/enums/httpCode";
import { ILogService } from "../interfaces/IServices/logService.interface";
import TYPES from "../types";


@injectable()
class EmailService implements IEmailService {

  constructor(@inject(TYPES.ILogService) private log: ILogService) { }

  private mailer = nodemailer.createTransport(Config.SMTP);

  send(email: Email): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.mailer.sendMail(email,
        async (error, info) => {
          if (error)
            resolve(await this.log.error('Rule', HttpCode.Internal_Server_Error, JSON.stringify(error)))
          else
            resolve(info);
        }
      );
    });
  }
}

export default EmailService;