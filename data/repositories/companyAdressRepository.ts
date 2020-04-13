import ICompanyAdressRepository from '../interfaces/IRepositories/ICompanyAdressRepository';
import company from '../models/company';
import CompanyAdress from '../models/companyAdress';
import { injectable } from "inversify";
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

  GetByCompany(company: company) {
    throw new Error("Method not implemented.");
  }

}

export default CompanyAdressRepository;