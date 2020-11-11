import { injectable, inject } from "inversify";

import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { IParkingFinanceService } from "../interfaces/IServices/parking-financeService.interface";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import IParkingFinanceRepository from "../interfaces/IRepositories/parking-financeRepository.interface";
import  ParkingFinance from "../models/parking-finance.model";

@injectable()
export class ParkingFinanceService implements IParkingFinanceService {

  constructor(
    @inject(TYPES.IParkingFinanceRepository) private repository: IParkingFinanceRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<ParkingFinance> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingFinance) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(parkingFinance: ParkingFinance): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingFinance)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Finance', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parkingFinance: ParkingFinance): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingFinance)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Finance', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Finance', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  toList(_parkingId: number): Promise<ParkingFinance[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(_parkingId)
        .then((result: ParkingFinance[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Finance', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
