import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { Attributes } from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ICompanyService } from "../interfaces/IServices/companyService.interface";
import { Company } from "../models/company.model";
import { ICompanyRepository } from "../interfaces/IRepositories/companyRepository.interface";
import { ICompanyAddressService } from "../interfaces/IServices/company-addressService.interface";
import { CompanyAddress } from "../models/company-address.model";

@injectable()
export class CompanyService implements ICompanyService {

  constructor(
    @inject(TYPES.ICompanyRepository) private repository: ICompanyRepository,
    @inject(TYPES.ICompanyAddressService) private addressService: ICompanyAddressService,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<Company> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: Company) => resolve(result))
        .catch(async (error: any) => {
          reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)))
        });
    });
  }

  save(company: Company): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.getByRegistryCode(company.registryCode)
        .then(async (found: Company) => {
          if (!Attributes.isValid(found)) {
            this.repository.save(company)
              .then(result => resolve(result))
              .catch(async (error: any) =>
                reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
          } else {
            reject(await this.log.critical('Empresa', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));
          }
        });
    });
  }

  update(company: Company): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(company)
        .then(async (result: any) => {
          const address = new CompanyAddress(company.address);
          if (Attributes.isValid(address) && address.id > 0) {
            await this.addressService.update(address);
          } else {
            address.companyId = company.id;
            await this.addressService.save(address);
          }
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByRegistryCode(registryCode: string): Promise<Company> {
    return new Promise(async (resolve, reject) => {
      if (Attributes.isValid(registryCode)) {
        this.repository.getByRegistryCode(registryCode)
          .then((result: Company) => resolve(result))
          .catch(async (error: any) =>
            reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
      } else {
        reject(await this.log.error('Empresa', HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, undefined));
      }
    });
  }
}
