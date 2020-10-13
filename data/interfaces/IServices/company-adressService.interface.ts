import { CompanyAdress } from '../../models/company-adress.model';

export interface ICompanyAdressService {

  getById(id: number): Promise<CompanyAdress>;
  getByCompanyId(id: number): Promise<CompanyAdress>;
  save(companyAdress: CompanyAdress): Promise<any>;
  update(companyAdress: CompanyAdress): Promise<any>;
}