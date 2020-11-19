import { injectable, inject } from "inversify";

import TYPES from "../types";
import { Attributes } from "../../commons/core/attributes";
import { IParkingRepository } from "../interfaces/IRepositories/parkingRepository.interface";
import { InnerException } from "../../commons/core/innerException";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import { Parking } from "../models/parking.model";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingAddressService } from "../interfaces/IServices/parking-addressService.interface";
import { ParkingAddress } from "../models/parking-address.model";

import * as Config from '../../config.json';
import { Crypto } from "../../commons/core/crypto";
import { CryptoType } from "../../commons/enums/cryptoType";
const _qrCode = Config.QrCode;

@injectable()
export class ParkingService implements IParkingService {

  constructor(
    @inject(TYPES.IParkingRepository) private repository: IParkingRepository,
    @inject(TYPES.IParkingAddressService) private addressService: IParkingAddressService,
    @inject(TYPES.ILogService) private log: ILogService) { }

  toList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then((result: Parking[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: Parking) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parking)
        .then(async (result: Parking) => {
          result.qrcode = _qrCode.url + Crypto.encrypt(String(result.id), CryptoType.ANYTHING);
          parking.address.parkingId = result.id;
          const address: ParkingAddress = new ParkingAddress(parking.address);
          await this.addressService.save(address);
          await this.update(result);
          resolve(result);
        }).catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => {
      if (Attributes.isNullOrUndefined(parking.qrcode)) {
        parking.qrcode = _qrCode.url + Crypto.encrypt(String(parking.id), CryptoType.ANYTHING);
      }
      this.repository.update(parking)
        .then(async (result: any) => {
          const address: ParkingAddress = new ParkingAddress(parking.address);
          if (Attributes.isValid(address) && address.id > 0) {
            await this.addressService.update(address);
          } else {
            address.parkingId = parking.id;
            await this.addressService.save(address);
          }
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByRegistryCode(parking: Parking): Promise<Parking[]> {
    return new Promise(async (resolve, reject) => {
      if (Attributes.isValid(parking.companyId) && Attributes.isValid(parking.registryCode)) {
        this.repository.getByRegistryCode(parking.companyId, parking.registryCode)
          .then((result: Parking[]) => resolve(result))
          .catch(async (error: any) =>
            reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
      } else {
        reject(await this.log.error('Parking', HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, undefined));
      }
    });
  }

  getByEmployeeId(employeeId: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmployeeId(employeeId)
        .then((result: Parking) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByCompanyId(companyId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(companyId)
        .then(async (result: Parking[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
