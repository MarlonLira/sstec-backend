import { injectable, inject } from "inversify";
import { IParkingRepository } from "../interfaces/IRepositories/parkingRepository.interface";
import TYPES from "../types";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ICompanyService } from "../interfaces/IServices/companyService.interface";
import { Company } from "../models/company.model";
import { ICompanyRepository } from "../interfaces/IRepositories/companyRepository.interface";
import { ICompanyAdressService } from "../interfaces/IServices/company-adressService.interface";

@injectable()
export class CompanyService implements ICompanyService {

  constructor(
    @inject(TYPES.IParkingRepository) private repository: ICompanyRepository,
    @inject(TYPES.IParkingAdressService) private adressService: ICompanyAdressService,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<Company> {
    throw new Error("Method not implemented.");
  }

  save(company: Company): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(company: Company): Promise<any> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getByRegistryCode(registryCode: string): Promise<Company> {
    throw new Error("Method not implemented.");
  }

  getByEmployeeId(employeeId: number): Promise<Company> {
    throw new Error("Method not implemented.");
  }

  toList(): Promise<Company[]> {
    throw new Error("Method not implemented.");
  }
}
