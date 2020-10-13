import { injectable, inject } from "inversify";
import TYPES from "../types";
import { IVehicleService } from "../interfaces/IServices/vehicleService.interface";
import Vehicle from "../models/vehicle.model";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import IVehicleRepository from "../interfaces/IRepositories/vehicleRepository.interface";

@injectable()
export class VehicleService implements IVehicleService {

  constructor(
    @inject(TYPES.IVehicleRepository) private repository: IVehicleRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getByUserId(userId: number): Promise<Vehicle[]> {
    return new Promise(async (resolve, reject) => {
      this.repository.getByUserId(userId)
        .then(async (result: Vehicle[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vehicle', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  getByLicensePlate(_licensePlate: string): Promise<Vehicle[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByLicensePlate(_licensePlate)
        .then(async (result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vehicle', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  save(vehicle: Vehicle): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(vehicle)
        .then(async (result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vehicle', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  update(vehicle: Vehicle): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(vehicle)
        .then(result => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vehicle', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    })
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vehicle', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))))
    })
  }

  getById(id: number): Promise<Vehicle> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: Vehicle) => {
          const _result: any = result.ToAny();
          resolve(_result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Vehicle', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }
}
