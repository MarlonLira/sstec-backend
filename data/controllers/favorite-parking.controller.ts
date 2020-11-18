import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import TYPES from '../types';
import { Http } from '../../commons/core/http';
import { FavoriteParking } from "../models/favorite-parking.model";
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IFavoriteParkingService } from "../interfaces/IServices/favorite-parkingService.interface";
import { safetyMiddleware } from "../../middleware/safety/safety.config";

@controller('', safetyMiddleware())
class FavoriteParkingController {

  constructor(
    @inject(TYPES.IFavoriteParkingService) private service: IFavoriteParkingService) { }

  @httpPost('/favoriteParking')
  post(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.save(new FavoriteParking(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Favorito', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Favorito')));
    });
  }

  @httpGet('/favoriteParking/:id')
  getById(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: FavoriteParking) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Favorito', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Favorito')));
    });
  }

  @httpGet('/favoriteParking/userId/:userId')
  getByUserId(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.getByUserId(Number(req.params.userId))
        .then((result: FavoriteParking[]) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Favorito', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Favorito')));
    });
  }

  @httpDelete('/favoriteParking/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>): Promise<any> {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Favorito', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Favorito')));
    });
  }
}

export default FavoriteParkingController;