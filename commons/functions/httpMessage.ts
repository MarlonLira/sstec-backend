import { HttpCode } from '../enums/httpCode';

/**
 * @description http://weblink.com.br/blog/o-que-e-http-codigos-erros-http
 * @author Marlon Lira
 * @param {HttpCode} value
 * @param {*} [entitie=null]
 * @param {*} [_result=null]
 * @param {string} [msg='']
 * @returns 
 */
function HttpMessage(value: HttpCode, entitie = null, _result = null, msg = '') {
  var result;
  switch (value) {
    case HttpCode.Continue: {
      result = {
        code: 100,
        message: `${entitie.name} -  Continue - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Processing: {
      result = {
        code: 102,
        message: `${entitie.name} -  Processing - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Ok: {
      result = {
        code: 200,
        message: `${entitie.name} -  Ok - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Created: {
      result = {
        code: 201,
        message: `${entitie.name} - Created - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Accepted: {
      result = {
        code: 202,
        message: `${entitie.name} - Accepted - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Found: {
      result = {
        code: 302,
        message: `${entitie.name} - Found - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Bad_Request: {
      result = {
        code: 400,
        message: `${entitie.name} - Bad Request - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Unauthorized: {
      result = {
        code: 401,
        message: `${entitie.name} - Unauthorized - ${msg}`,
        result: _result
      }
      break;
    }
    case HttpCode.Forbidden: {
      result = {
        code: 403,
        message: `${entitie.name} - Forbidden - ${msg}`,
        result: _result
      }

      break;
    }
    case HttpCode.Not_Found: {
      result = {
        code: 404,
        message: `${entitie.name} - Not Found - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Expectation_Failed: {
      result = {
        code: 417,
        message: `${entitie.name} - Expectation Failed - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Internal_Server_Error: {
      result = {
        code: 500,
        message: `${entitie.name} - Internal Server Error - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Not_Implemented: {
      result = {
        code: 501,
        message: `${entitie.name} - Not Implemented - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Bad_Gateway: {
      result = {
        code: 502,
        message: `${entitie.name} - Bad Gateway - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Service_Unavailable: {
      result = {
        code: 503,
        message: `${entitie.name} - Service Unavailable - ${msg}`,
        result: _result
      };
      break;
    }
    default: {
      result = {
        code: 0,
        message: `${entitie.name} - Internal Configuration Server Error - ${msg}`,
        result: _result
      };
    }
  }
  return result;
}

export { HttpMessage };