import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ICompanyController from "../interfaces/IControllers/ICompanyController";
import ICompanyRepository from '../interfaces/IRepositories/ICompanyRepository';
import Company from "../models/company";
import TYPES from '../types';
import { Attributes, Crypto } from '../../commons/helpers';
import { Http } from '../../commons/http';
import { HttpCode } from '../../commons/enums/httpCode';

/**
 * @description
 * @author Gustavo Gusmão
 * @class CompanyController
 * @implements {ICompanyController}
 */
@controller('')
class CompanyController implements ICompanyController {

  /**
   *Creates an instance of CompanyController.
   * @author Gustavo Gusmão
   * @param {ICompanyRepository} _companyRepository
   * @memberof CompanyController
   */
  constructor(@inject(TYPES.ICompanyRepository) private _companyRepository: ICompanyRepository) {}

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CompanyController
   */
  @httpPost('/company')
  Save(@request() req: Request<any>, @response() res: Response<any>) {
    let _company = new Company(req.body);
    return new Promise((resolve, reject) => {
      this._companyRepository.Save(_company)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Empresa cadastrada com sucesso', CompanyController, result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error,''))
        })
    })
  }

  @httpGet('/company')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpGet('/companies')
  SearchAll(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpPut('/company')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

  @httpDelete('/company')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    throw new Error("Method not implemented.");
  }

}

export default CompanyController;