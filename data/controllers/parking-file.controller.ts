import { Response, Request } from "express";
import { controller, httpPost, request, response, httpGet, httpDelete } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { IParkingFileService } from "../interfaces/IServices/parking-fileService.interface";
import Http from "../../commons/core/http";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ParkingFile } from "../models/parking-file.model";

@controller('')
class ParkingFileController {

  constructor(
    @inject(TYPES.IParkingFileService) private service: IParkingFileService,
  ) { }

  @httpPost('/parkingFile/')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new ParkingFile(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }

  @httpGet('/parkingfiles/parkingId/:parkingId')
  getByParkingId(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByParkingId(Number(req.params.parkingId))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Upload', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Upload')));
    });
  }

  @httpDelete('/parkingfile/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Estacionamento', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Estacionamento')));
    });
  }
}

export default ParkingFileController;