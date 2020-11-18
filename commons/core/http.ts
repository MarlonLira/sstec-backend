import { Response } from "express";
import { HttpCode } from '../enums/httpCode';
import { HttpMessage } from "../enums/httpMessage";
import { ApiResponse } from "./apiResponse";

export class Http {

  static SendMessage(res: Response, code: HttpCode, msg: HttpMessage, entity: string, result = null) {
    return res.status(code).send(this.buildMessage(code, entity, msg, result));
  }

  static SendErrorMessage(res, error: HttpMessage, entity) {
    switch (error) {
      case HttpMessage.Parameters_Not_Provided:
        return Http.SendMessage(res, HttpCode.Bad_Request, error, entity);
      case HttpMessage.Login_Unauthorized:
        return Http.SendMessage(res, HttpCode.Unauthorized, error, entity);
      case HttpMessage.Not_Found:
        return Http.SendMessage(res, HttpCode.Not_Found, error, entity);
      case HttpMessage.Already_Exists:
        return Http.SendMessage(res, HttpCode.Bad_Request, error, entity);
      case HttpMessage.Request_Unauthorized:
        return Http.SendMessage(res, HttpCode.Unauthorized, error, entity);
      case HttpMessage.Request_Forbidden:
        return Http.SendMessage(res, HttpCode.Forbidden, error, entity);
      default:
        return Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, entity, error);
    }
  }

  static SendSimpleMessage(res: Response, code: HttpCode, json: any) {
    return res.status(code).send(json);
  }

  private static buildMessage(value: HttpCode, entity: string, msg: HttpMessage, _result = null) {
    return new ApiResponse({
      code: value,
      codeMessage: HttpCode[value],
      message: `${entity} - ${msg}`,
      result: _result
    });
  }
}