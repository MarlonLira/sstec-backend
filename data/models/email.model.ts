import Attributes from '../../commons/core/attributes';

class Email {

  subject: string;
  text: string;
  from: string;
  to: string;

  constructor(json?: any) {
    if (json) {
      this.subject = Attributes.ReturnIfValid(json.subject);
      this.text = Attributes.ReturnIfValid(json.text);
      this.from = Attributes.ReturnIfValid(json.from);
      this.to = Attributes.ReturnIfValid(json.to);
    }
  }
}

export default Email;