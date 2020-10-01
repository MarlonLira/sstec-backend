import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ICompanyAddressService } from "../interfaces/IServices/company-addressService.interface";
import { ICompanyAddressRepository } from "../interfaces/IRepositories/company-addressRepository.interface";
import { CompanyAddress } from "../models/company-address.model";

@injectable()
export class CompanyAddressService implements ICompanyAddressService {

  constructor(
    @inject(TYPES.ICompanyAddressRepository) private repository: ICompanyAddressRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<CompanyAddress> {
    throw new Error("Method not implemented.");
  }

  getByCompanyId(id: number): Promise<CompanyAddress> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(id)
        .then(async (result: CompanyAddress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Company', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(companyAddress: CompanyAddress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(companyAddress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Company', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parkingAddress: CompanyAddress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingAddress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Company', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
