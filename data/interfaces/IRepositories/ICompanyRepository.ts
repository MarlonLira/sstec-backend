import Company from '../../models/company';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICompanyRepository
 */
interface ICompanyRepository {
  Save(company: Company);
  Update(company: Company);
  GetByRegistryCode(registryCode: string);
  Delete(id: number);
}

export default ICompanyRepository;