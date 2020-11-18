import { Company } from '../../models/company.model';

export interface ICompanyRepository {
  save(company: Company);
  update(company: Company);
  getByRegistryCode(registryCode: string);
  getById(id: number);
  delete(id: number);
}