import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { ICompanyRepository } from '../interfaces/IRepositories/companyRepository.interface';
import { Company } from "../models/company.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";

@controller('')
class CompanyController {

  constructor(@inject(TYPES.ICompanyRepository) private _companyRepository: ICompanyRepository) { }

  @httpPost('/company')
  post(@request() req: Request<any>, @response() res: Response<any>) {
    const _company = new Company(req.body.company);
    return new Promise((resolve) => {
      this._companyRepository.getByRegistryCode(_company.registryCode)
        .then((found: Company) => {
          if (!Attributes.IsValid(found)) {
            this._companyRepository.save(_company)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Empresa', result));
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Empresa', error));
              })
          } else {
            resolve((Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Already_Exists, 'Empresa')));
          }
        });
    });
  }

  @httpGet('/company/registryCode/:registryCode')
  getByRegistryCode(@request() req: Request, @response() res: Response) {
    return new Promise((resolve) => {
      const _company = new Company(req.params);
      if (Attributes.IsValid(_company.registryCode)) {
        this._companyRepository.getByRegistryCode(_company.registryCode)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Empresa', result))
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Empresa', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, 'Empresa'));
      }
    });
  }

  @httpPut('/company')
  put(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _company = new Company(req.body.company);
      if (Attributes.IsValid(_company.id)) {
        this._companyRepository.update(_company)
          .then(result => {
            resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Empresa', result));
          })
          .catch(error => {
            resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Empresa', error));
          });
      } else {
        resolve(Http.SendMessage(res, HttpCode.Not_Found, HttpMessage.Not_Found, 'Empresa'));
      }
    });
  }

  @httpDelete('/company/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _id: number = req.params.id;
      this._companyRepository.delete(_id)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Empresa', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Empresa', error));
        });
    });
  }
}

export default CompanyController;