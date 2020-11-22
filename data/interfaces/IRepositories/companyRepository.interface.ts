import { Company } from '../../models/company.model';

export interface ICompanyRepository {
  save(company: Company): Promise<Company>;
  update(company: Company): Promise<any>;
  getByRegistryCode(registryCode: string): Promise<any>;
  getById(id: number): Promise<Company>;
  delete(id: number): Promise<any>;
}