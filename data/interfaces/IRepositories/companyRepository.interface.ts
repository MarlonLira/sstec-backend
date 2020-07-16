import Company from '../../models/company.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICompanyRepository
 */
interface ICompanyRepository {
  Save(company: Company);
  Update(company: Company);
  GetByRegistryCode(registryCode: string);
  GetById(id: number);
  Delete(id: number);
}

export default ICompanyRepository;