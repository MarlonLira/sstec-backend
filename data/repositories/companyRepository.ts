import { Op } from 'sequelize';

import ICompanyRepository from '../interfaces/IRepositories/ICompanyRepository';
import Company from '../models/company';
import Attributes from '../../commons/core/attributes';
import { injectable } from "inversify";
import Logger from '../../commons/core/logger';

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
    return new Promise(async (resolve, reject) => {
      const _transaction = await Company.sequelize.transaction();
      company.status = 'AT';
      Company.create(company, { transaction: _transaction })
        .then(async (result: Company) => {
          await _transaction.commit();
          resolve(result.id);
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Company} company
   * @memberof CompanyRepository
   */
  Update(company: Company) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Company.sequelize.transaction();
      Company.findByPk(company.id)
        .then((result: Company) => {
          Company.update({
            status: Attributes.ReturnIfValid(company.status, result.status),
            name: Attributes.ReturnIfValid(company.name, result.name),
            registryCode: Attributes.ReturnIfValid(company.registryCode, result.registryCode),
            phone: Attributes.ReturnIfValid(company.phone, result.phone)
          },
            {
              where: { id: company.id }
            })
            .then(async result => {
              await _transaction.commit();
              resolve(result);
            })
            .catch(async error => {
              await _transaction.rollback();
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
    return new Promise(async (resolve, reject) => {
      const _transaction = await Company.sequelize.transaction();
      Company.update({ status: 'EE' },
        {
          where: { id: id },
          transaction: _transaction
        })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        })
        .catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {string} registryCode
   * @returns
   * @memberof CompanyRepository
   */
  GetByRegistryCode(registryCode: string) {
    return new Promise((resolve, reject) => {
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