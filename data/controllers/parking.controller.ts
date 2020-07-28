import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import Parking from "../models/parking.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";

/**
 * @description
 * @author Marlon Lira
 * @class ParkingController
 */
@controller('')
class ParkingController {

  /**
   * Creates an instance of ParkingController.
   * @author Marlon Lira
   * @param {IParkingService} service
   * @memberof ParkingController
   */
  constructor(@inject(TYPES.IParkingService) private service: IParkingService) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpPost('/parking')
  Save(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new Parking(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpGet('/parking/companyId/:companyId/registryCode/:registryCode')
  Search(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByRegistryCode(new Parking(req.params))
        .then((result: Parking[]) => resolve(Http.SendMessage(res, HttpCode.Found, HttpMessage.Found, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpGet('/parkings/companyId/:companyId')
  SearchAll(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      this.service.toList(Number(req.params.companyId))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpPut('/parking')
  Update(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new Parking(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingController
   */
  @httpDelete('/parking/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }
}

export default ParkingController;