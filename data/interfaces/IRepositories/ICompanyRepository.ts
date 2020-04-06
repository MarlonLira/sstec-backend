import Company from '../../models/company';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface ICompanyRepository
 */
interface ICompanyRepository {
  Save(company: Company);
  GetByName(companyName: string);
  GetByRegistryCode(registryCode: string);
  ToList();
  Find(company: Company, properties: string[]);
}

export default ICompanyRepository;