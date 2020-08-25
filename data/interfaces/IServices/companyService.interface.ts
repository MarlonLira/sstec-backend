import { Company } from '../../models/company.model';

export interface ICompanyService {
  getById(id: number): Promise<Company>;
  save(company: Company): Promise<any>;
  update(company: Company): Promise<any>;
  delete(id: number): Promise<any>;
  getByRegistryCode(registryCode: string): Promise<Company>;
  getByEmployeeId(employeeId: number): Promise<Company>;
  toList(): Promise<Company[]>;
}