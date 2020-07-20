import { Response, Request } from "express";
import { controller, httpGet, httpPost, httpDelete, request, response, httpPut } from "inversify-express-utils";
import { inject } from "inversify";

import ICompanyAdressController from "../interfaces/IControllers/ICompanyAdressController";
import ICompanyAdressRepository from '../interfaces/IRepositories/company-adressRepository.interface';
import CompanyAdress from "../models/companyAdress.model";
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
    const _companyAdress = new CompanyAdress(req.body.companyAdress);
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Request<any>} req
   * @param {Response<any>} res
   * @memberof CompanyAdressController
   */
  @httpGet('/companyAdress/companyId/:companyId')
  Search(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _companyId: number = req.params.companyId;
      this._companyAdressRepository.GetByCompanyId(_companyId)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Found, 'Endereço da empresa', result))
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }

  @httpPut('/companyAdress')
  Update(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _companyAdress = new CompanyAdress(req.body.companyAdress);
      this._companyAdressRepository.Update(_companyAdress)
        .then(result => {
          resolve(Http.SendMessage(res, HttpCode.Ok, HttpMessage.Updated_Successfully, 'Endereço da empresa', result));
        })
        .catch(error => {
          resolve(Http.SendMessage(res, HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, 'Endereço da empresa', error));
        });
    });
  }

  @httpDelete('/companyAdress/:id')
  Delete(@request() req: Request<any>, @response() res: Response<any>) {
    return new Promise((resolve) => {
      const _companyAdressId: number = req.params.id;
      this._companyAdressRepository.Delete(_companyAdressId)
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