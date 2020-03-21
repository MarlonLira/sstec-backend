import { HttpCode } from '../enums/Http';

//http://weblink.com.br/blog/o-que-e-http-codigos-erros-http
function GetHttpMessage(value: HttpCode, entitie = null, _result = null, msg = '') {
  var result;
  switch (value) {
    case HttpCode.Continue: {
      result = {
        code: 100,
        message: `${entitie.name} - Continua - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Processing: {
      result = {
        code: 102,
        message: `${entitie.name} - Processando - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Ok: {
      result = {
        code: 200,
        message: `${entitie.name} - OK - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Created: {
      result = {
        code: 201,
        message: `${entitie.name} - Criado - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Accepted: {
      result = {
        code: 202,
        message: `${entitie.name} - Aceito - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Found: {
      result = {
        code: 302,
        message: `${entitie.name} - Encontrado - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Bad_Request: {
      result = {
        code: 400,
        message: `${entitie.name} - Solicitação inválida - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Unauthorized: {
      result = {
        code: 401,
        message: `${entitie.name} - Não autorizado - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Forbidden: {
      result = {
        code: 403,
        message: `${entitie.name} - Proibido - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Not_Found: {
      result = {
        code: 404,
        message: `${entitie.name} - Não encontrado - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Expectation_Failed: {
      result = {
        code: 417,
        message: `${entitie.name} - A Expectativa falhou - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Internal_Server_Error: {
      result = {
        code: 500,
        message: `${entitie.name} - Erro interno no servidor - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Not_Implemented: {
      result = {
        code: 501,
        message: `${entitie.name} - Não implementado - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Bad_Gateway: {
      result = {
        code: 502,
        message: `${entitie.name} - Entrada negada - ${msg}`,
        result: _result
      };
      break;
    }
    case HttpCode.Service_Unavailable: {
      result = {
        code: 503,
        message: `${entitie.name} - Serviço indisponível - ${msg}`,
        result: _result
      };
      break;
    }
    default: {
      result = {
        code: 500,
        message: `${entitie.name} - Erro desconhecido - ${msg}`,
        result: _result
      };
    };
  }
  return result;
}


export { GetHttpMessage };