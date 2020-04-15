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
          message: `Continue - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Processing: {
        result = {
          code: 102,
          message: `Processing - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Ok: {
        result = {
          code: 200,
          message: `Ok - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Created: {
        result = {
          code: 201,
          message: `Created - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Accepted: {
        result = {
          code: 202,
          message: `Accepted - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Found: {
        result = {
          code: 302,
          message: `Found - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Bad_Request: {
        result = {
          code: 400,
          message: `Bad Request - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Unauthorized: {
        result = {
          code: 401,
          message: `Unauthorized - ${entity} - ${msg}`,
          result: _result
        }
        break;
      }
      case HttpCode.Forbidden: {
        result = {
          code: 403,
          message: `Forbidden - ${entity} - ${msg}`,
          result: _result
        }

        break;
      }
      case HttpCode.Not_Found: {
        result = {
          code: 404,
          message: `Not Found - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Expectation_Failed: {
        result = {
          code: 417,
          message: `Expectation Failed - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Internal_Server_Error: {
        result = {
          code: 500,
          message: `Internal Server Error - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Not_Implemented: {
        result = {
          code: 501,
          message: `Not Implemented - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Bad_Gateway: {
        result = {
          code: 502,
          message: `Bad Gateway - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      case HttpCode.Service_Unavailable: {
        result = {
          code: 503,
          message: `Service Unavailable - ${entity} - ${msg}`,
          result: _result
        };
        break;
      }
      default: {
        result = {
          code: 0,
          message: `Internal Configuration Server Error - ${entity} - ${msg}`,
          result: _result
        };
      }
    }
    result.message = result.message.replace('  ', ' ').replace('--', '-').replace('- -', '-').replace('-  -', '-').replace('  ', ' ');
    return result;
  }
}

export default Http;