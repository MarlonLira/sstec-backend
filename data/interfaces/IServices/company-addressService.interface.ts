import { CompanyAddress } from '../../models/company-address.model';

export interface ICompanyAddressService {

  getById(id: number): Promise<CompanyAddress>;
  getByCompanyId(id: number): Promise<CompanyAddress>;
  save(companyAddress: CompanyAddress): Promise<any>;
  update(companyAddress: CompanyAddress): Promise<any>;
}