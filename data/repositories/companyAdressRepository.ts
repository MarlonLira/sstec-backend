import ICompanyAdressRepository from '../interfaces/IRepositories/ICompanyAdressRepository';
import Company from '../models/company';
import CompanyAdress from '../models/companyAdress';
import { injectable } from "inversify";
import { TransactionType } from '../../commons/enums/transactionType';
import { Op } from 'sequelize';
import { cpus } from 'os';

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
  Update(_companyAdress: CompanyAdress): Promise<any>  {
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
   * @param {number} id
   * @memberof CompanyAdressRepository
   */
  Delete(_id: number): Promise<any>  {
    return new Promise(async (resolve, reject) => {
      const _transaction = await CompanyAdress.sequelize.transaction();
      CompanyAdress.update({
        status: TransactionType.DELETED
      },
        {
          where: {
            id: _id
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
   * @param {CompanyAdress} companyAdress
   * @returns
   * @memberof CompanyAdressRepository
   */
  Save(companyAdress: CompanyAdress) {
    return new Promise((resolve, reject) => {
      companyAdress.status = TransactionType.ACTIVE;
      CompanyAdress.create(companyAdress)
        .then(result => {
          resolve(result);
        }).catch(error => {
          reject(error);
        });
    });
  }
}

export default CompanyAdressRepository;