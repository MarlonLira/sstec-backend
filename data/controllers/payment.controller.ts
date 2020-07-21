import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import IPaymentRepository from '../interfaces/IRepositories/paymentRepository.interface';
import Payment from "../models/payment.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";

@controller('')
class PaymentController {

  /**
   * Creates an instance of PaymentController.
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
    return new Promise((resolve) => {
      const _payment = new Payment(req.body);
      this._paymentRepository.Save(_payment)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Pagamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Pagamento', error));
        });
    });
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
    return new Promise((resolve) => {
      const _payment: number = req.params.Id;
      this._paymentRepository.GetPaymentById(_payment)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Pagamento', result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Pagamento', error));
        });
    });
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