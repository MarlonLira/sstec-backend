import { injectable, inject } from "inversify";

import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { IParkingScoreService } from "../interfaces/IServices/parking-scoreService.interface";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingScoreRepository } from "../interfaces/IRepositories/parking-scoreRepository.interface";
import { ParkingScore } from "../models/parking-score.model";

@injectable()
export class ParkingScoreService implements IParkingScoreService {

  constructor(
    @inject(TYPES.IParkingScoreRepository) private repository: IParkingScoreRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getById(id: number): Promise<ParkingScore> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingScore) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(parkingScore: ParkingScore): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingScore)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Score', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(parkingScore: ParkingScore): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingScore)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Score', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Score', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByParkingId(parkingId: number): Promise<ParkingScore[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(parkingId)
        .then((result: ParkingScore[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Score', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
