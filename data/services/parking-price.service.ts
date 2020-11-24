import { injectable, inject } from "inversify";
import TYPES from "../types";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingPriceService } from "../interfaces/IServices/parking-priceService.interface";
import { IParkingPriceRepository } from "../interfaces/IRepositories/parking-priceRepository.interface";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { ParkingPrice } from "../models/parking-price.model";
import { HttpCode } from "../../commons/enums/httpCode";
import { InnerException } from "../../commons/core/innerException";
import { TransactionType } from "../../commons/enums/transactionType";

@injectable()
export class ParkingPriceService implements IParkingPriceService {

  constructor(
    @inject(TYPES.IParkingPriceRepository) private repository: IParkingPriceRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getByParkingId(id: number): Promise<ParkingPrice[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then((result: ParkingPrice[]) => resolve(result))
        .catch(error => {
          reject(this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
        });
    });
  }

  getById(id: number): Promise<ParkingPrice> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: ParkingPrice) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(model: ParkingPrice): Promise<any> {
    return new Promise(async (resolve, reject) => {
      model.status = TransactionType.ACTIVE;
      this.repository.save(model)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  update(model: ParkingPrice): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(model)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Preço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    });
  }
}