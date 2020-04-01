import { Response } from "express";
import { HttpCode } from './enums/HttpCode';
import { HttpMessage } from './functions/HttpMessage';

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
   * @param {string} [msg='']
   * @param {*} [entity=null]
   * @param {*} [result=null]
   * @returns 
   * @memberof Http
   */
  static SendMessage(res: Response, code: HttpCode, msg: string = '', entity = null, result = null) {
    return res.status(code).send(HttpMessage(code, entity, result, msg));
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
}

export { Http };