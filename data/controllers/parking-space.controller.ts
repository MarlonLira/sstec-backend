import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";
import ParkingSpace from "../models/parking-space.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingSpaceService } from "../interfaces/IServices/parkingSpaceService.interface";

@controller('')
class ParkingSpaceController {

  constructor(@inject(TYPES.IParkingSpaceService) private service: IParkingSpaceService) { }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpPost('/parkingSpace')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingSpace(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Vaga', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Vaga')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpGet('/parkingSpace/id/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: ParkingSpace) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Vaga', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Vaga')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpGet('/parkingSpace/parkingId/:parkingId')
  getByParkingId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkinkId(Number(req.params.parkingId))
        .then((result: ParkingSpace[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Vaga', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Vaga')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpPut('/parkingSpace')
  put(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.update(new ParkingSpace(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Vaga', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Vaga')));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns {Promise<any>}
   * @memberof ParkingSpaceController
   */
  @httpDelete('/parkingSpace/parkingId/:parkingId/type/:type/amount/:amount')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.deleteGroupType(new ParkingSpace(req.params))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Vaga', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Vaga')));
    });
  }
}

export default ParkingSpaceController;