import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ISchedulingService } from "../interfaces/IServices/schedulingService.interface";
import Attributes from "../../commons/core/attributes";
import { ISchedulingRepository } from "../interfaces/IRepositories/schedulingRepository.interface";
import { Scheduling } from "../models/scheduling.model";
import { IParkingServiceService } from "../interfaces/IServices/parking-serviceService.interface";
import { ISchedulingServiceService } from "../interfaces/IServices/scheduling-serviceService.interface";
import { SchedulingService } from "../models/scheduling-service.model";
import { ISchedulingServiceRepository } from "../interfaces/IRepositories/scheduling-serviceRepository.interface";

@injectable()
export class SchedulingServiceService implements ISchedulingServiceService {

  constructor(
    @inject(TYPES.ISchedulingServiceRepository) private repository: ISchedulingServiceRepository,
    @inject(TYPES.ISchedulingRepository) private SchedulingRepository: ISchedulingRepository,
    @inject(TYPES.IParkingServiceService) private parkingServiceService: IParkingServiceService,
    @inject(TYPES.ILogService) private log: ILogService
    ) { }
  getByScheduling(scheduling: Scheduling): Promise<SchedulingService> {
    throw new Error("Method not implemented.");
  }

  save(schedulingService: SchedulingService): Promise<any> {
    throw new Error("Method not implemented.");
  }

  update(schedulingService: SchedulingService): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(schedulingService)
        .then((result: any) => {
          global.SocketServer.emit('get.schedulingServices');
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => {
          global.SocketServer.emit('get.schedulingServices');
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getById(id: number): Promise<SchedulingService> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: SchedulingService) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

}
