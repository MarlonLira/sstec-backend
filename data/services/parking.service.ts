import { injectable, inject } from "inversify";
import { IParkingRepository } from "../interfaces/IRepositories/parkingRepository.interface";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import { Parking } from "../models/parking.model";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingAdressService } from "../interfaces/IServices/parking-adressService.interface";
import { ParkingAdress } from "../models/parking-adress.model";

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class ParkingService
 * @implements {IParkingService}
 */
@injectable()
export class ParkingService implements IParkingService {

  /**
   * Creates an instance of ParkingService.
   * @author Marlon Lira
   * @param {IParkingRepository} repository
   * @memberof ParkingService
   */
  constructor(
    @inject(TYPES.IParkingRepository) private repository: IParkingRepository,
    @inject(TYPES.IParkingAdressService) private adressService: IParkingAdressService,
    @inject(TYPES.ILogService) private log: ILogService) { }

  toList(): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then(async (result: Parking[]) => {
          const adresses = await this.adressService.toList();
          const parkings = [];

          result.forEach((parking: Parking) => {
            const _result: any = parking.ToModify();
            _result.adress = adresses.find(x => x.parkingId === parking.id);
            parkings.push(_result);
          })

          resolve(parkings);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: Parking) => {
          const _result: any = result.ToModify();
          _result.adress = await this.adressService.getByParkingId(result.id);
          resolve(_result);
        }).catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parking)
        .then(async (result: any) => {
          parking.adress.parkingId = result;
          const adress: ParkingAdress = new ParkingAdress(parking.adress);
          await this.adressService.save(adress);
          resolve(result)
        }).catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parking)
        .then(async (result: any) => {
          const adress: ParkingAdress = new ParkingAdress(parking.adress);
          if (Attributes.IsValid(adress) && adress.id > 0) {
            await this.adressService.update(adress);
          } else {
            adress.parkingId = parking.id;
            await this.adressService.save(adress);
          }
          resolve(result)
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
      if (Attributes.IsValid(parking.companyId) && Attributes.IsValid(parking.registryCode)) {
        this.repository.getByRegistryCode(parking.companyId, parking.registryCode)
          .then((result: Parking[]) => resolve(result))
          .catch(async (error: any) =>
            reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
      } else {
        reject(await this.log.error('Parking', HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, undefined));
      }
    });
  }

  getByEmployeeId(employeeId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmployeeId(employeeId)
        .then((result: Parking[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByCompanyId(companyId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(companyId)
        .then((result: Parking[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
