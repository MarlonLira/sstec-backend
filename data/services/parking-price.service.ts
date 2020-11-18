import { injectable, inject } from "inversify";
import TYPES from "../types";
import { Attributes } from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingPriceService } from "../interfaces/IServices/parking-priceService.interface";
import { IParkingPriceRepository } from "../interfaces/IRepositories/parking-priceRepository.interface";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { ParkingPrice } from "../models/parking-price.model";
import { HttpCode } from "../../commons/enums/httpCode";
import { InnerException } from "../../commons/core/innerException";

@injectable()
export class ParkingPriceService implements IParkingPriceService {

  constructor(
    @inject(TYPES.IParkingSpaceRepository) private repository: IParkingPriceRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<ParkingPrice> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingPrice) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
  save(parkingPrice: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.repository.save(parkingPrice)
      .then(async (result: any) => resolve(result))
      .catch(async (error: any) =>
        reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }
  update(parkingPrice: ParkingPrice): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingPrice)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    })
  }
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    })
  }
  toList(parkingId: number): Promise<ParkingPrice[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingPrice[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}