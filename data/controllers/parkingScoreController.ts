import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut, results } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingScoreController from "../interfaces/IControllers/IParkingScoreController";
import IParkingScoreRepository from '../interfaces/IRepositories/IParkingScoreRepository';
import ParkingScore from "../models/ParkingScore";
import TYPES from '../types';
import Attributes from "../../commons/core/attributes";
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Emerson Souza
 * @class ParkingScoreController
 * @implements {IParkingScoreController}
 */
@controller('')
class ParkingScoreController implements IParkingScoreController {

  constructor(@inject(TYPES.IParkingScoreRepository) private _parkingScoreRepository: IParkingScoreRepository) { }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  Save(req: Request<any, any, any, import("express-serve-static-core").Query>, res: Response<any>): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  Search(req: Request<any, any, any, import("express-serve-static-core").Query>, res: Response<any>): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  Update(req: Request<any, any, any, import("express-serve-static-core").Query>, res: Response<any>): Promise<any> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any, any, any, import("express-serve-static-core").Query>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingScoreController
   */
  Delete(req: Request<any, any, any, import("express-serve-static-core").Query>, res: Response<any>): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export default ParkingScoreController;