import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut, results } from "inversify-express-utils";
import { inject } from "inversify";

import IParkingSpaceController from "../interfaces/IControllers/IParkingSpaceController";
import IParkingSpaceRepository from '../interfaces/IRepositories/IParkingSpaceRepository';
import ParkingSpace from "../models/ParkingSpace";
import Parking from "../models/Parking";
import TYPES from '../types';
import Attributes from '../../commons/core/attributes';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";


/**
 * @description
 * @author Emerson Souza
 * @class ParkingSpaceController
 * @implements {IParkingSpaceController}
 */
@controller('')
class ParkingSpaceController implements IParkingSpaceController {

  /**
   *Creates an instance of ParkingSpaceController.
   * @author Emerson Souza
   * @param {IParkingSpaceRepository} _parkingSpaceRepository
   * @memberof ParkingSpaceController
   */
  constructor(@inject(TYPES.IParkingSpaceRepository) private _parkingSpaceRepository: IParkingSpaceRepository) { }
  
  /**
   * @description
   * @author Emerson Souza
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof ParkingSpaceController
   */
  @httpPost('/parkingSpace')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _parkingSpace = new ParkingSpace(req.body.parkingSpace);
      let _parkingId = req.body.parking.Id;
      this._parkingSpaceRepository.Save(_parkingSpace, _parkingId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Estacionamento', error));
        })
    })
  }

  Search(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }
  SearchAll(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }
  Update(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }
  Delete(req: Request<any>, res: Response<any>) {
    throw new Error("Method not implemented.");
  }
}


export default ParkingSpaceController;