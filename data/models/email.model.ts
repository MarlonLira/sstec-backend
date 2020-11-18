import { Attributes } from '../../commons/core/attributes';

export class Email {

  subject: string;
  text: string;
  from: string;
  to: string;

  constructor(json?: any) {
    if (json) {
      this.subject = Attributes.returnIfValid(json.subject);
      this.text = Attributes.returnIfValid(json.text);
      this.from = Attributes.returnIfValid(json.from);
      this.to = Attributes.returnIfValid(json.to);
    }
  }
}