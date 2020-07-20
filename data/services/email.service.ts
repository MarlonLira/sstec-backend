import { injectable } from "inversify";
import * as nodemailer from 'nodemailer';
import * as Config from '../../config.json';
import { IEmailService } from "../interfaces/IServices/emailService.interface";
import Email from '../models/email.model';


@injectable()
class EmailService implements IEmailService {

  private mailer = nodemailer.createTransport(Config.SMTP);

  send(email: Email): Promise<any> {
    return new Promise(async (resolve, reject) => {
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