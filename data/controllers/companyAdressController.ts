import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ICompanyAdressController from "../interfaces/IControllers/ICompanyAdressController";
import ICompanyAdressRepository from '../interfaces/IRepositories/ICompanyAdressRepository';
import CompanyAdress from "../models/companyAdress";
import Company from "../models/company";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Gustavo Gusmão
 * @class CompanyAdressController
 * @implements {ICompanyAdressController}
 */
@controller('')
class CompanyAdressController implements ICompanyAdressController {

  /**
   * Creates an instance of CompanyAdressController.
   * @author Gustavo Gusmão
   * @param {ICompanyAdressRepository} _companyAdressRepository
   * @memberof CompanyAdressController
   */
  constructor(@inject(TYPES.ICompanyAdressRepository) private _companyAdressRepository: ICompanyAdressRepository) { }

  @httpPost('/companyAdress')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    const _companyAdress = new CompanyAdress(req.body);
    return new Promise((resolve) => {
      this._companyAdressRepository.Save(_companyAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Saved_Successfully, 'Endereço', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço', error));
        });
    });
  }

  @httpGet('/companyAdress')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpGet('/companiesAdress')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpPut('/companyAdress')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpDelete('/companyAdress')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }
}

export default CompanyAdressController;