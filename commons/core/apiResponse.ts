import Attributes from './attributes';

class ApiResponse {

  code: number;
  message: string;
  result: any;

  constructor(json?: any) {
    this.code = Attributes.ReturnIfValid(json.code);
    this.message = Attributes.ReturnIfValid(json.message);
    this.result = Attributes.ReturnIfValid(json.result);
  }
}

export default ApiResponse;