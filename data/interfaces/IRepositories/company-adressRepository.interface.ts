import { CompanyAdress } from '../../models/company-adress.model';

export interface ICompanyAdressRepository {
  save(companyAdress: CompanyAdress): Promise<any>;
  getByCompanyId(_companyId: number): Promise<CompanyAdress>;
  update(companyAdress: CompanyAdress): Promise<any>;
  delete(_id: number): Promise<any>;
}