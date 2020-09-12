import { injectable, inject } from "inversify";
import TYPES from "../types";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ICompanyService } from "../interfaces/IServices/companyService.interface";
import { Company } from "../models/company.model";
import { ICompanyRepository } from "../interfaces/IRepositories/companyRepository.interface";
import { ICompanyAdressService } from "../interfaces/IServices/company-adressService.interface";
import { CompanyAdress } from "../models/company-adress.model";

@injectable()
export class CompanyService implements ICompanyService {

  constructor(
    @inject(TYPES.ICompanyRepository) private repository: ICompanyRepository,
    @inject(TYPES.ICompanyAdressService) private adressService: ICompanyAdressService,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<Company> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: Company) => {
          const _result: any = result.ToModify();
          _result.adress = await this.adressService.getByCompanyId(result.id);
          resolve(_result);
        }).catch(async (error: any) => {
          reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)))
        });
    });
  }

  save(company: Company): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.getByRegistryCode(company.registryCode)
        .then(async (found: Company) => {
          if (!Attributes.IsValid(found)) {
            this.repository.save(company)
              .then(result => resolve(result))
              .catch(async (error: any) =>
                reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
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
          const adress = new CompanyAdress(company.adress);
          if (Attributes.IsValid(adress) && adress.id > 0) {
            await this.adressService.update(adress);
          } else {
            adress.companyId = company.id;
            await this.adressService.save(adress);
          }
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Empresa', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByRegistryCode(registryCode: string): Promise<Company> {
    return new Promise(async (resolve, reject) => {
      if (Attributes.IsValid(registryCode)) {
        this.repository.getByRegistryCode(registryCode)
          .then((result: Company) => resolve(result))
          .catch(async (error: any) =>
            reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
      } else {
        reject(await this.log.error('Parking', HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, undefined));
      }
    });
  }
}
