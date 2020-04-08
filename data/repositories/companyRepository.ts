import { Op } from 'sequelize';

import ICompanyRepository from '../interfaces/IRepositories/ICompanyRepository';
import Company from '../models/company';
import { Querying } from '../../commons/helpers';
import { injectable } from "inversify";
import { combineTableNames } from 'sequelize/types/lib/utils';

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
    return new Promise((resolve) => {
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @returns
   * @memberof CompanyRepository
   */
  ToList() {
    return new Promise((resolve) => {
      Company.findAll()
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {string} companyName
   * @returns
   * @memberof CompanyRepository
   */
  GetByName(companyName: string) {
    return new Promise((resolve) => {
      Company.findAll({
        where: {
          name: {
            [Op.like]: `${companyName}%`
          }
        }
      })
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {string} registryCode
   * @returns
   * @memberof CompanyRepository
   */
  GetByRegistryCode(registryCode: string) {
    return new Promise((resolve) => {
      Company.findAll({
        where: {
          name: {
            [Op.like]: `${registryCode}%`
          }
        }
      })
        .then(result => {
          resolve(result);
        }
        )
        .catch(error => {
          throw error;
        })
    })
  }
  Find(company: Company, properties: string[]) {
    return new Promise((resolve) => {
      let query: any;
      query = Querying.ReturnOrQuery(company, properties);
      Company.findAll({
        where: query
      }).then(result => {
        resolve(result);
      }).catch(error => {
        throw (error);
      })
    });
  }

}

export default CompanyRepository;