import Attributes from './attributes';

/**
 * @description
 * @author Marlon Lira
 * @class ApiResponse
 */
class ApiResponse {

  code: number;
  message: string;
  result: any;

  /**
   *Creates an instance of ApiResponse.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof ApiResponse
   */
  constructor(json?: any) {
    this.code = Attributes.ReturnIfValid(json.code);
    this.message = Attributes.ReturnIfValid(json.message);
    this.result = Attributes.ReturnIfValid(json.result);
  }
}

export default ApiResponse;