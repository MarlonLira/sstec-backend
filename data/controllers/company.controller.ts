import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { Company } from "../models/company.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ICompanyService } from "../interfaces/IServices/companyService.interface";

@controller('')
class CompanyController {

  constructor(@inject(TYPES.ICompanyService) private service: ICompanyService) { }

  @httpPost('/company')
  post(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.save(new Company(req.body))
        .then((result: any) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Empresa', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Empresa')));
    });
  }

  @httpGet('/company/registryCode/:registryCode')
  getByRegistryCode(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.getByRegistryCode(req.params.registryCode)
        .then((result: Company) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Empresa', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Empresa')));
    });
  }

  @httpGet('/company/:id')
  getById(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      this.service.getById(Number(req.params.id))
        .then((result: Company) => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Empresa', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Empresa')));
    });
  }

  @httpPut('/company')
  put(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.update(new Company(req.body))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Empresa', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Empresa')));
    });
  }

  @httpDelete('/company/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      this.service.delete(Number(req.params.id))
        .then(result => resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Empresa', result)))
        .catch((error: any) => resolve(Http.SendErrorMessage(res, error, 'Empresa')));
    });
  }
}

export default CompanyController;