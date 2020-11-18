import { Email } from '../../models/email.model';

export interface IEmailService {
  send(email: Email): Promise<any>;
}