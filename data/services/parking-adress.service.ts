import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { IParkingAdressService } from "../interfaces/IServices/parking-adressService.interface";
import { ParkingAdress } from "../models/parking-adress.model";
import { IParkingAdressRepository } from "../interfaces/IRepositories/parking-adressRepository.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class ParkingAdressService
 * @implements {IParkingAdressService}
 */
@injectable()
export class ParkingAdressService implements IParkingAdressService {

  constructor(
    @inject(TYPES.IParkingAdressRepository) private repository: IParkingAdressRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  toList(): Promise<ParkingAdress[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList()
        .then(async (result: ParkingAdress[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<ParkingAdress> {
    throw new Error("Method not implemented.");
  }

  getByParkingId(id: number): Promise<ParkingAdress> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then(async (result: ParkingAdress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(parkingAdress: ParkingAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parkingAdress: ParkingAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
