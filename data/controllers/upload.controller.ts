import { Response, Request } from "express";
import { controller, httpPost, request, response } from "inversify-express-utils";
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
  ParkingUpload(@request() req: Request, @response() res: Response) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.service.saveParkingFile(req, res);
        resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Send_Successfully, 'Upload', result));
      } catch (error) {
        reject(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Unknown_Error, 'Upload', error));
      }
    });
  }
}

export default UploadController;