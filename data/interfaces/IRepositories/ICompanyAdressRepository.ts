import CompanyAdress from '../../models/companyAdress';
import Company from '../../models/company';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICompanyAdressRepository
 */
interface ICompanyAdressRepository {
  Save(companyAdress: CompanyAdress);
  GetByCompany(companyId: Company);
}

export default ICompanyAdressRepository;