import { CompanyAddress } from '../../models/company-address.model';

export interface ICompanyAddressRepository {
  save(companyAddress: CompanyAddress): Promise<any>;
  getByCompanyId(companyId: number): Promise<CompanyAddress>;
  update(companyAddress: CompanyAddress): Promise<any>;
  delete(id: number): Promise<any>;
}