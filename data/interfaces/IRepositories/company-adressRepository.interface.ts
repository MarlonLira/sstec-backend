import CompanyAdress from '../../models/companyAdress.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICompanyAdressRepository
 */
interface ICompanyAdressRepository {
  Save(companyAdress: CompanyAdress): Promise<any>;
  GetByCompanyId(_companyId: number): Promise<CompanyAdress[]>;
  Update(companyAdress: CompanyAdress): Promise<any>;
  Delete(_id: number): Promise<any>;
}

export default ICompanyAdressRepository;