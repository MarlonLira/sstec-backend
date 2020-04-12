import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ICompanyController from "../interfaces/IControllers/ICompanyController";
import ICompanyRepository from '../interfaces/IRepositories/ICompanyRepository';
import Company from "../models/company";
import TYPES from '../types';
import Http from '../../commons/core/http';
import { HttpCode } from '../../commons/enums/httpCode';
import Attributes from "../../commons/core/attributes";

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
  constructor(@inject(TYPES.ICompanyRepository) private _companyRepository: ICompanyRepository) { }

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
      this._companyRepository.GetByRegistryCode(_company.registryCode)
        .then((found: Company) => {
          if (!Attributes.IsValid(found)) {
            this._companyRepository.Save(_company)
              .then(result => {
                resolve(Http.SendMessage(res, HttpCode.Ok, 'Empresa cadastrada com sucesso!', CompanyController, result))
              })
              .catch(error => {
                resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', CompanyController))
              })
          } else {
            resolve((Http.SendMessage(res, HttpCode.Bad_Request, 'Erro! Empresa já cadastrada!', CompanyController)))
          }
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CompanyController
   */
  @httpGet('/company/registryCode/:registryCode')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve, reject) => {
      let _registryCode: string = req.params.registryCode;
      this._companyRepository.GetByRegistryCode(_registryCode)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Encontrado!', CompanyController, result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', CompanyController));
        })
    })
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CompanyController
   */
  @httpPut('/company')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve, reject) => {
      let _company = new Company(req.body);
      this._companyRepository.Update(_company)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Empresa atualizada com sucesso!', CompanyController, result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', CompanyController));
        })
    })
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @returns
   * @memberof CompanyController
   */
  @httpDelete('/company/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve, reject) => {
      let _id: number = req.params.id;
      this._companyRepository.Delete(_id)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Empresa deletada com sucesso!', CompanyController, result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, '', CompanyController, error));
        });
    });
  }
}

export default CompanyController;