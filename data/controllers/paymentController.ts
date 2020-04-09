import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IPaymentController from "../interfaces/IControllers/IPaymentController";
import IPaymentRepository from '../interfaces/IRepositories/IPaymentRepository';
import Payment from "../models/payment";
import TYPES from '../types';
import Attributes from '../../commons/core/attributes';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';

/**
 * @description
 * @author Emerson Souza
 * @class PaymentController
 * @implements {IPaymentController}
 */
@controller('')
class PaymentController implements IPaymentController {

  /**
   *Creates an instance of PaymentController.
   * @author Emerson Souza
   * @param {IPaymentRepository} _paymentRepository
   * @memberof PaymentController
   */
  constructor(@inject(TYPES.IPaymentRepository) private _paymentRepository: IPaymentRepository) { }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof PaymentController
   */
  @httpPost('/payment')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof PaymentController
   */
  @httpGet('/payment')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof PaymentController
   */
  @httpGet('/payments')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof PaymentController
   */
  @httpPut('/payment')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof PaymentController
   */
  @httpDelete('/payment')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }
}

export default PaymentController;