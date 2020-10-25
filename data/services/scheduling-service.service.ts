import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ISchedulingServiceService } from "../interfaces/IServices/scheduling-serviceService.interface";
import { SchedulingService } from "../models/scheduling-service.model";
import { ISchedulingServiceRepository } from "../interfaces/IRepositories/scheduling-serviceRepository.interface";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class SchedulingServiceService
 * @implements {ISchedulingServiceService}
 */
@injectable()
export class SchedulingServiceService implements ISchedulingServiceService {

  constructor(
    @inject(TYPES.ISchedulingServiceRepository) private repository: ISchedulingServiceRepository,
    @inject(TYPES.ILogService) private log: ILogService
    ) { }

  save(schedulingService: SchedulingService): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(schedulingService)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  update(schedulingService: SchedulingService): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(schedulingService)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
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

  getBySchedulingId(schedulingId: number): Promise<SchedulingService[]> {
    return new Promise((resolve, reject) => {
      this.repository.getBySchedulingId(schedulingId)
        .then(async (result: SchedulingService[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByParkingServiceId(parkingServiceId: number): Promise<SchedulingService[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingServiceId(parkingServiceId)
        .then(async (result: SchedulingService[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
