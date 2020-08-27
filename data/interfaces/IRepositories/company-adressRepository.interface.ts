import { CompanyAdress } from '../../models/company-adress.model';

export interface ICompanyAdressRepository {
  save(companyAdress: CompanyAdress): Promise<any>;
  getByCompanyId(companyId: number): Promise<CompanyAdress>;
  update(companyAdress: CompanyAdress): Promise<any>;
  delete(id: number): Promise<any>;
}