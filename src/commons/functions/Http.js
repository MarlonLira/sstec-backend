"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http_1 = require("../enums/Http");
//http://weblink.com.br/blog/o-que-e-http-codigos-erros-http
function GetHttpMessage(value, entitie = null, result = null) {
    var result;
    switch (value) {
        case Http_1.HttpCode.Continue: {
            result = "Continua";
            break;
        }
        case Http_1.HttpCode.Processing: {
            result = "Processando";
            break;
        }
        case Http_1.HttpCode.Ok: {
            result = {
                code: 200,
                message: `${entitie.name} Ok`,
                result: result
            };
            break;
        }
        case Http_1.HttpCode.Created: {
            result = {
                code: 201,
                message: `${entitie.name} Criado/Gerado`,
                result: result
            };
            break;
        }
        case Http_1.HttpCode.Accepted: {
            result = `${entitie.name} Aceito`;
            break;
        }
        case Http_1.HttpCode.Found: {
            result = {
                code: 302,
                message: `${entitie.name} Encontrato`,
                result: result
            };
            break;
        }
        case Http_1.HttpCode.Bad_Request: {
            result = {
                code: 400,
                message: `${entitie.name} Solicitação Inválida`,
                result: result
            };
            break;
        }
        case Http_1.HttpCode.Unauthorized: {
            break;
        }
        case Http_1.HttpCode.Forbidden: {
            break;
        }
        case Http_1.HttpCode.Not_Found: {
            result = {
                code: 404,
                message: `${entitie.name} Not Found`,
                result: result
            };
            break;
        }
        case Http_1.HttpCode.Expectation_Failed: {
            break;
        }
        case Http_1.HttpCode.Internal_Server_Error: {
            result = {
                code: 500,
                message: `${entitie.name} Internal Server Error`,
                result: result
            };
            break;
        }
        case Http_1.HttpCode.Not_Implemented: {
            break;
        }
        case Http_1.HttpCode.Bad_Gateway: {
            break;
        }
        case Http_1.HttpCode.Service_Unavailable: {
            break;
        }
        default: {
            result = {
                code: 500,
                message: `${entitie.name} Internal Server Error`,
                result: result
            };
        }
    }
    return result;
}
exports.GetHttpMessage = GetHttpMessage;
//# sourceMappingURL=Http.js.map