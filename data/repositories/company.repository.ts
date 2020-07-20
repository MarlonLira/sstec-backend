import { Op } from 'sequelize';

import ICompanyRepository from '../interfaces/IRepositories/companyRepository.interface';
import Company from '../models/company.model';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';

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
      company.status = TransactionType.ACTIVE;
      Company.create(company, { transaction: _transaction })
        .then(async (result: Company) => {
          await _transaction.commit();
          resolve({ "id": result.id });
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
      Company.update(company.toJSON(),
        {
          where: {
            id: company.id
          },
          transaction: _transaction,
          validate: false
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
   * @param {number} id
   * @memberof CompanyRepository
   */
  Delete(_id: number) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await Company.sequelize.transaction();
      Company.update({ status: TransactionType.DELETED },
        {
          where: { id: _id },
          transaction: _transaction,
          validate: false
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
  GetByRegistryCode(registryCode: string): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      Company.findAll({
        where: {
          registryCode: {
            [Op.like]: `${registryCode}%`
          },
            status: {
              [Op.ne]: TransactionType.DELETED
            }
        }
      })
        .then((foundCompany: Company[]) => {
          resolve(foundCompany);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns
   * @memberof CompanyRepository
   */
  GetById(id: number) {
    return new Promise((resolve, reject) => {
      Company.findByPk(id)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export default CompanyRepository;