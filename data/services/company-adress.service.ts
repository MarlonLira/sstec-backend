import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ICompanyAdressService } from "../interfaces/IServices/company-adressService.interface";
import { ICompanyAdressRepository } from "../interfaces/IRepositories/company-adressRepository.interface";
import { CompanyAdress } from "../models/company-adress.model";

@injectable()
export class CompanyAdressService implements ICompanyAdressService {

  constructor(
    @inject(TYPES.ICompanyAdressRepository) private repository: ICompanyAdressRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<CompanyAdress> {
    throw new Error("Method not implemented.");
  }

  getByCompanyId(id: number): Promise<CompanyAdress> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(id)
        .then(async (result: CompanyAdress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Company', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(companyAdress: CompanyAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(companyAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Company', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parkingAdress: CompanyAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Company', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
