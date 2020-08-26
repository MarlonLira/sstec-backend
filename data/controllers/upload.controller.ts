import { Response, Request } from "express";
import { controller, httpPost, request, response, httpGet } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { IUploadService } from "../interfaces/IServices/uploadService.interface";
import Http from "../../commons/core/http";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";

@controller('')
class UploadController {

  constructor(
    @inject(TYPES.IUploadService) private service: IUploadService,
  ) { }

  @httpPost('/parking/upload')
  parkingUpload(@request() req: Request, @response() res: Response) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.service.saveParkingFile(req, res);
        resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Send_Successfully, 'Upload', result));
      } catch (error) {
        reject(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Unknown_Error, 'Upload', error));
      }
    });
  }

  @httpGet('/uploads/parkingId/:parkingId')
  getAll(@request() req: Request, @response() res: Response): Promise<any> {
    return new Promise((resolve) => {
      this.service.toListByParkingId(Number(req.params.parkingId))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Upload', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Upload')));
    });
  }
}

export default UploadController;