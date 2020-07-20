import { injectable } from "inversify";
import { Op } from 'sequelize';

import ICompanyAdressRepository from '../interfaces/IRepositories/company-adressRepository.interface';
import CompanyAdress from '../models/companyAdress.model';
import { TransactionType } from '../../commons/enums/transactionType';

/**
 * @description
 * @author Gustavo Gusmão
 * @class CompanyAdressRepository
 * @implements {ICompanyAdressRepository}
 */
@injectable()
class CompanyAdressRepository implements ICompanyAdressRepository {

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} _companyId
   * @returns {Promise<CompanyAdress[]>}
   * @memberof CompanyAdressRepository
   */
  GetByCompanyId(_companyId: number): Promise<CompanyAdress[]> {
    return new Promise(async (resolve, reject) => {
      CompanyAdress.findAll(
        {
          where: {
            companyId: _companyId,
            status: {
              [Op.ne]: TransactionType.DELETED
            }
          }
        }
      )
        .then((foundCompanyAdress: CompanyAdress[]) => {
          resolve(foundCompanyAdress);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {company} company
   * @memberof CompanyAdressRepository
   */
  Update(_companyAdress: CompanyAdress): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAdress.sequelize.transaction();
      CompanyAdress.update(_companyAdress.ToModify(),
        {
          where:
          {
            id: _companyAdress.companyId
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
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof CompanyAdressRepository
   */
  Delete(_id: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAdress.sequelize.transaction();
      CompanyAdress.destroy({
        where: {
          id: _id
        },
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
   * @param {CompanyAdress} companyAdress
   * @returns
   * @memberof CompanyAdressRepository
   */
  Save(companyAdress: CompanyAdress) {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAdress.sequelize.transaction();
      companyAdress.status = TransactionType.ACTIVE;
      CompanyAdress.create(companyAdress, { transaction: _transaction })
        .then(async result => {
          await _transaction.commit();
          resolve(result);
        }).catch(async error => {
          await _transaction.rollback();
          reject(error);
        });
    });
  }
}

export default CompanyAdressRepository;