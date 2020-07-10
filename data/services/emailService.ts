import { injectable } from "inversify";
import * as nodemailer from 'nodemailer';
import * as Config from '../../config.json';
import IEmailService from "../interfaces/IServices/IEmailService";
import Email from '../models/email';


@injectable()
class EmailService implements IEmailService {

  private mailer = nodemailer.createTransport(Config.SMTP);

  Send(email: Email): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let _info: any;
      this.mailer.sendMail(email,
        (error, info) => {
          if (error)
            reject(error);
          else
            resolve(info);
        }
      );
    });
  }

}

export default EmailService;