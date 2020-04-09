import { Op } from 'sequelize';

import ICompanyRepository from '../interfaces/IRepositories/ICompanyRepository';
import Company from '../models/company';
import Attributes from '../../commons/core/attributes';
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
   * @memberof CompanyRepository
   */
  Update(company: Company) {
    return new Promise((resolve) => {
      Company.findByPk(company.id)
        .then((result: Company) => {
          Company.update({
            status: Attributes.ReturnIfValid(company.status, result.status),
            name: Attributes.ReturnIfValid(company.name, result.name),
            registryCode: Attributes.ReturnIfValid(company.registryCode, result.registryCode),
            phone: Attributes.ReturnIfValid(company.phone, result.phone),
            email: Attributes.ReturnIfValid(company.email, result.email)
          },
            {
              where: {
                id: company.id
              }
            })
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              throw error;
            })
        })
    })
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @memberof CompanyRepository
   */
  Delete(id: number) {
    return new Promise((resolve) => {
      Company.findByPk(id)
        .then((result: Company) => {
          Company.update({
            status: 'EX',
            name: Attributes.ReturnIfValid(result.name),
            registryCode: Attributes.ReturnIfValid(result.registryCode),
            phone: Attributes.ReturnIfValid(result.phone),
            email: Attributes.ReturnIfValid(result.email)
          },
            {
              where: {
                id: id
              }
            })
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              throw error;
            })
        })
    })
  }

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
   * @param {string} registryCode
   * @returns
   * @memberof CompanyRepository
   */
  GetByRegistryCode(registryCode: string) {
    return new Promise((resolve) => {
      Company.findOne({
        where: {
          registryCode: {
            [Op.eq]: registryCode
          }
        }
      })
        .then(result => {
          resolve(result);

        })
        .catch(error => {
          throw error;
        })
    })
  }
}

export default CompanyRepository;