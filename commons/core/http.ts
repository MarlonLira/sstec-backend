import { Response } from "express";
import { HttpCode } from '../enums/httpCode';
import { HttpMessage } from "../enums/httpMessage";
import ApiResponse from "./apiResponse";

/**
 * @description
 * @author Marlon Lira
 * @class Http
 */
class Http {

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {Response} res
   * @param {HttpCode} code
   * @param {HttpMessage} msg
   * @param {string} entity
   * @param {*} [result=null]
   * @returns
   * @memberof Http
   */
  static SendMessage(res: Response, code: HttpCode, msg: HttpMessage, entity: string, result = null) {
    return res.status(code).send(this.CreateMessage(code, entity, msg, result));
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} res
   * @param {HttpMessage} error
   * @param {*} entity
   * @returns
   * @memberof Http
   */
  static SendErrorMessage(res, error: HttpMessage, entity) {
    switch (error) {
      case HttpMessage.Parameters_Not_Provided:
        return Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, entity, error);
      default:
        return Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, entity, error);
    }
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {Response} res
   * @param {HttpCode} code
   * @param {*} json
   * @returns
   * @memberof Http
   */
  static SendSimpleMessage(res: Response, code: HttpCode, json: any) {
    return res.status(code).send(json);
  }

  /**
   * @description
   * @author Marlon Lira
   * @private
   * @static
   * @param {HttpCode} value
   * @param {*} [entitie=null]
   * @param {*} [_result=null]
   * @param {string} [msg='']
   * @returns
   * @memberof Http
   */
  private static CreateMessage(value: HttpCode, entity: string, msg: HttpMessage, _result = null): ApiResponse {
    let result: ApiResponse;
    switch (value) {
      case HttpCode.Continue: {
        result = {
          code: 100,
          codeMessage: 'Continue',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Processing: {
        result = {
          code: 102,
          codeMessage: 'Processing',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Ok: {
        result = {
          code: 200,
          codeMessage: 'Ok',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Created: {
        result = {
          code: 201,
          codeMessage: 'Created',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Accepted: {
        result = {
          code: 202,
          codeMessage: 'Accepted',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Found: {
        result = {
          code: 302,
          codeMessage: 'Found',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Bad_Request: {
        result = {
          code: 400,
          codeMessage: 'Bad Request',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Unauthorized: {
        result = {
          code: 401,
          codeMessage: 'Unauthorized',
          message: `${entity} - ${msg}`,
          result: _result
        }
        break;
      }
      case HttpCode.Forbidden: {
        result = {
          code: 403,
          codeMessage: 'Forbidden',
          message: `${entity} - ${msg}`,
          result: _result
        }

        break;
      }
      case HttpCode.Not_Found: {
        result = {
          code: 404,
          codeMessage: 'Not Found',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Expectation_Failed: {
        result = {
          code: 417,
          codeMessage: 'Expectation Failed',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Internal_Server_Error: {
        result = {
          code: 500,
          codeMessage: 'Internal Server Error',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Not_Implemented: {
        result = {
          code: 501,
          codeMessage: 'Not Implemented',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Bad_Gateway: {
        result = {
          code: 502,
          codeMessage: 'Bad Gateway',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Service_Unavailable: {
        result = {
          code: 503,
          codeMessage: 'Service Unavailable',
          message: `${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      default: {
        result = {
          code: 0,
          codeMessage: 'Internal Configuration Server Error',
          message: `${entity} - ${msg}`,
          result: _result
        };
      }
    }
    result.message = result.message.replace('  ', ' ').replace('--', '-').replace('- -', '-').replace('-  -', '-').replace('  ', ' ');
    return result;
  }
}

export default Http;