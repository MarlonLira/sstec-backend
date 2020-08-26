import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import { ICompanyAdressRepository } from '../interfaces/IRepositories/company-adressRepository.interface';
import { CompanyAdress } from "../models/company-adress.model";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";

@controller('')
class CompanyAdressController {

  /**
   * Creates an instance of CompanyAdressController.
   * @author Gustavo Gusmão
   * @param {ICompanyAdressRepository} _companyAdressRepository
   * @memberof CompanyAdressController
   */
  constructor(@inject(TYPES.ICompanyAdressRepository) private _companyAdressRepository: ICompanyAdressRepository) { }

  @httpPost('/companyAdress')
  post(@request() req: Request<any>, @response() res: Response<any>) {
    const _companyAdress = new CompanyAdress(req.body.companyAdress);
    return new Promise((resolve) => {
      this._companyAdressRepository.save(_companyAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Endereço', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço', error));
        });
    });
  }

  @httpGet('/companyAdress/companyId/:companyId')
  getByCompanyId(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _companyId: number = req.params.companyId;
      this._companyAdressRepository.getByCompanyId(_companyId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Endereço da empresa', result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }

  @httpPut('/companyAdress')
  put(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _companyAdress = new CompanyAdress(req.body.companyAdress);
      this._companyAdressRepository.update(_companyAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Endereço da empresa', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }

  @httpDelete('/companyAdress/:id')
  delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _companyAdressId: number = req.params.id;
      this._companyAdressRepository.delete(_companyAdressId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Deleted_Successfully, 'Endereço da empresa', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }
}

export default CompanyAdressController;