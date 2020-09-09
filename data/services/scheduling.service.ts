import { injectable, inject } from "inversify";
import TYPES from "../types";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ISchedulingService } from "../interfaces/IServices/schedulingService.interface";
import IParkingSpaceRepository from "../interfaces/IRepositories/parking-spaceRepository.interface";
import IParkingPromotionRepository from "../interfaces/IRepositories/parking-promotionRepository.interface";
import IUserRepository from "../interfaces/IRepositories/userRepository.interface";
import IVehicleRepository from "../interfaces/IRepositories/vehicleRepository.interface";
import ICardRepository from "../interfaces/IRepositories/cardRepository.interface";
import Attributes from "../../commons/core/attributes";
import { ISchedulingRepository } from "../interfaces/IRepositories/schedulingRepository.interface";
import { Scheduling } from "../models/scheduling.model";

@injectable()
export class SchedulingService implements ISchedulingService {

  constructor(
    @inject(TYPES.ISchedulingRepository) private repository: ISchedulingRepository,
    @inject(TYPES.IParkingSpaceRepository) private parkingSpaceService: IParkingSpaceRepository,
    @inject(TYPES.IParkingPromotionRepository) private parkingPromotionService: IParkingPromotionRepository,
    @inject(TYPES.IUserRepository) private userService: IUserRepository,
    @inject(TYPES.IVehicleRepository) private vehicleService: IVehicleRepository,
    @inject(TYPES.ICardRepository) private cardRepository: ICardRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  save(scheduling: Scheduling): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (
          Attributes.IsValid(scheduling.cardId) &&
          Attributes.IsValid(scheduling.userId) &&
          Attributes.IsValid(scheduling.parkingId) &&
          Attributes.IsValid(scheduling.vehicleId)
        ) {
          const _availableParkingSpace = await this.parkingSpaceService.GetAvailable(scheduling);
          if (Attributes.IsValid(_availableParkingSpace)) {
            scheduling.parkingSpaceId = _availableParkingSpace[0].id;
            scheduling.userName = (await this.userService.GetById(scheduling.userId)).name;
            scheduling.vehiclePlate = (await this.vehicleService.GetById(scheduling.vehicleId)).licensePlate;
            scheduling.cardNumber = (await this.cardRepository.GetById(scheduling.cardId)).number;

            const _userSchedulings: Scheduling[] = await this.repository.getByUserId(scheduling.userId);
            if (Attributes.IsValid(_userSchedulings)) {
              const _userScheduling = await this.repository.returnIfExists(scheduling);

              if (Attributes.IsValid(_userScheduling)) {
                reject(await this.log.info('Scheduling', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined));

              } else {
                this.repository.save(scheduling)
                  .then(result => {
                    global.SocketServer.emit('get.schedulings', result);
                    resolve(result);
                  });
              }
            } else {
              this.repository.save(scheduling)
                .then(result => {
                  global.SocketServer.emit('get.schedulings', result);
                  resolve(result);
                });
            }
          } else {
            reject(await this.log.info('Scheduling', HttpCode.Not_Found, HttpMessage.Not_Found, undefined));
          }
        } else {
          reject(await this.log.error('Scheduling', HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Scheduling', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
      }
    });
  }

  update(scheduling: Scheduling): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(scheduling)
        .then((result: any) => {
          global.SocketServer.emit('get.schedulings');
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Scheduling', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => {
          global.SocketServer.emit('get.schedulings');
          resolve(result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Scheduling', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getById(id: number): Promise<Scheduling> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: Scheduling) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Scheduling', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByUserId(id: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByUserId(id)
        .then((result: Scheduling[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Scheduling', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByCompanyId(id: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByCompanyId(id)
        .then((result: Scheduling[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Scheduling', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByParkingId(id: number): Promise<Scheduling[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then((result: Scheduling[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Scheduling', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }
}