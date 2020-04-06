import Company from '../../models/company';

interface ICompanyRepository {
  Save(company: Company);
}

export default ICompanyRepository;