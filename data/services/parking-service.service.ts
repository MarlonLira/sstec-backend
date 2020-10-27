import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingServiceService } from "../interfaces/IServices/parking-serviceService.interface";
import { IParkingServiceRepository } from "../interfaces/IRepositories/parking-serviceRepository.interface";
import { ParkingService } from "../models/parking-service.model";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @class ParkingServiceService
 * @implements {IParkingServiceService}
 */
@injectable()
export class ParkingServiceService implements IParkingServiceService {

  constructor(
    @inject(TYPES.IParkingServiceRepository) private repository: IParkingServiceRepository,
    @inject(TYPES.ILogService) private log: ILogService
    ) { }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingService} parkingService
   * @returns {Promise<any>}
   * @memberof ParkingServiceService
   */
  save(parkingService: ParkingService): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingService)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof ParkingServiceService
   */
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))))
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<ParkingService>}
   * @memberof ParkingServiceService
   */
  getById(id: number): Promise<ParkingService> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingService) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<ParkingService[]>}
   * @memberof ParkingServiceService
   */
  getByParkinkId(id: number): Promise<ParkingService[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then((result: ParkingService[]) => resolve(result))
        .catch(error => {
          reject(this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingService} parkingService
   * @returns {Promise<any>}
   * @memberof ParkingServiceService
   */
  update(parkingService: ParkingService): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(new ParkingService(parkingService))
        .then(result => resolve(result))
        .catch(error =>
          reject(this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} parkingId
   * @returns {Promise<ParkingService[]>}
   * @memberof ParkingServiceService
   */
  toList(parkingId: number): Promise<ParkingService[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingService[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Agendamento de serviço', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
