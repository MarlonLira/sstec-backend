import { Op } from 'sequelize';

import ICompanyRepository from '../interfaces/IRepositories/ICompanyRepository';
import Company from '../models/company';
import { Querying } from '../../commons/helpers';
import { injectable } from "inversify";

/**
 * @description
 * @author Gustavo Gusmão
 * @class CompanyRepository
 * @implements {ICompanyRepository}
 */
@injectable()
class CompanyRepository implements ICompanyRepository {

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Company} company
   * @returns
   * @memberof CompanyRepository
   */
  Save(company: Company) {
    return new Promise((resolve, reject) => {
      Company.create({
        status: 'AT',
        name: company.name,
        registryCode: company.registryCode,
        phone: company.phone,
        email: company.email
      }).then(result => {
        resolve(result);
      }).catch(error => {
        throw (error);
      })
    })
  }
  
}

export default CompanyRepository;