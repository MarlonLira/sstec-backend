import { Op } from 'sequelize';

import ICompanyAdressRepository from '../interfaces/IRepositories/ICompanyAdressRepository';
import company from '../models/company';
import CompanyAdress from '../models/companyAdress';
import { Querying } from '../../commons/helpers';
import { injectable } from "inversify";

/**
 * @description
 * @author Gustavo Gusmão
 * @class CompanyAdressRepository
 * @implements {ICompanyAdressRepository}
 */
class CompanyAdressRepository implements ICompanyAdressRepository {

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {CompanyAdress} companyAdress
   * @returns
   * @memberof CompanyAdressRepository
   */
  Save(companyAdress: CompanyAdress) {
    return new Promise((resolve) => {
      CompanyAdress.create({
        status: 'AT',
        country: companyAdress.country,
        city: companyAdress.city,
        street: companyAdress.street,
        number: companyAdress.number,
        zipCode: companyAdress.zipCode,
        complement: companyAdress.complement,
      }).then(result => {
        resolve(result);
      }).catch(error => {
        throw (error);
      })
    })
  }

  GetByCompany(company: company ) {
    throw new Error("Method not implemented.");
  }
  
}

export default CompanyAdressRepository;