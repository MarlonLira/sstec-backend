import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ICompanyController from "../interfaces/IControllers/ICompanyController";
import ICompanyRepository from '../interfaces/IRepositories/ICompanyRepository';
import Company from "../models/company";
import TYPES from '../types';
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
    return new Promise((resolve) => {
      this._companyRepository.Save(_company)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Empresa cadastrada com sucesso!', CompanyController, result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error))
        })
    })
  }

  @httpGet('/company/registryCode/:registryCode')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _registryCode: string = req.params.registryCode;
      this._companyRepository.GetByRegistryCode(_registryCode)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Encontrado!', CompanyController, result));
        })
        .catch(error =>{
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
  }

  @httpPut('/company')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _company = new Company(req.body);
      this._companyRepository.Update(_company)
        .then(result =>{
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Empresa atualizada com sucesso!', CompanyController, result))
        })
        .catch(error =>{
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
  }

  @httpDelete('/company/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      let _id: number =  req.params.id;
      this._companyRepository.Delete(_id)
        .then(result =>{
          resolve(Http.SendMessage(res, HttpCode.Ok, 'Empresa deletada com sucesso!', CompanyController, result))
        })
        .catch(error =>{
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error));
        })
    })
  }

}

export default CompanyController;