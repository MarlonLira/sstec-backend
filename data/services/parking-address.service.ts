import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { IParkingAddressService } from "../interfaces/IServices/parking-addressService.interface";
import { ParkingAddress } from "../models/parking-address.model";
import { IParkingAddressRepository } from "../interfaces/IRepositories/parking-addressRepository.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class ParkingAddressService
 * @implements {IParkingAddressService}
 */
@injectable()
export class ParkingAddressService implements IParkingAddressService {

  constructor(
    @inject(TYPES.IParkingAddressRepository) private repository: IParkingAddressRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  toList(): Promise<ParkingAddress[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then(async (result: ParkingAddress[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<ParkingAddress> {
    throw new Error("Method not implemented.");
  }

  getByParkingId(id: number): Promise<ParkingAddress> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then(async (result: ParkingAddress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(parkingAddress: ParkingAddress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingAddress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parkingAddress: ParkingAddress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingAddress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
