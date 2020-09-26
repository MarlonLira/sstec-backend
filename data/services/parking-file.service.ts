import { injectable, inject } from "inversify";
import { ParkingFile } from "../models/parking-file.model";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { IParkingFileRepository } from "../interfaces/IRepositories/parkingFileRepository.interface";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { IParkingFileService } from "../interfaces/IServices/parking-fileService.interface";

@injectable()
export class ParkingFileService implements IParkingFileService {

  constructor(
    @inject(TYPES.IParkingFileRepository) private repository: IParkingFileRepository,
    @inject(TYPES.ILogService) private log: ILogService) {
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking File', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  save(parkingFile: ParkingFile): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingFile)
        .then(async (result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking File', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByParkingId(parkingId: number): Promise<ParkingFile[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingFile[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking File', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

}
