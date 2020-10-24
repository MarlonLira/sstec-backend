import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingServiceService } from "../interfaces/IServices/parking-serviceService.interface";
import { IParkingServiceRepository } from "../interfaces/IRepositories/parking-serviceRepository.interface";
import { ParkingService } from "../models/parking-service.model";
import { TransactionType } from "../../commons/enums/transactionType";
import { Scheduling } from "../models/scheduling.model";

@injectable()
export class ParkingServiceService implements IParkingServiceService {

  constructor(
    @inject(TYPES.IParkingServiceRepository) private repository: IParkingServiceRepository,
    @inject(TYPES.ILogService) private log: ILogService
    ) { }

  save(parkingService: ParkingService): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(parkingService: ParkingService): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getById(id: number): Promise<ParkingService> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingService) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByParkinkId(id: number): Promise<ParkingService[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then((result: ParkingService[]) => resolve(result))
        .catch(error => {
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
        });
    });
  }


  update(parkingService: ParkingService): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(new ParkingService(parkingService))
        .then(result => resolve(result))
        .catch(error =>
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }


  toList(parkingId: number): Promise<ParkingService[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingService[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
