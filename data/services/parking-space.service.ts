import { injectable, inject } from "inversify";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { Attributes } from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { IParkingSpaceService } from "../interfaces/IServices/parking-spaceService.interface";
import { IParkingSpaceRepository } from "../interfaces/IRepositories/parking-spaceRepository.interface";
import { ParkingSpace } from "../models/parking-space.model";
import { TransactionType } from "../../commons/enums/transactionType";
import { Scheduling } from "../models/scheduling.model";

@injectable()
export class ParkingSpaceService implements IParkingSpaceService {

  constructor(
    @inject(TYPES.IParkingSpaceRepository) private repository: IParkingSpaceRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      this.repository.getAvailable(scheduling)
        .then((result: ParkingSpace[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  deleteGroupType(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise((resolve, reject) => {
      if (Attributes.isValid(parkingSpace)) {
        this.repository.deleteGroupType(parkingSpace)
          .then(result => resolve(result))
          .catch(error =>
            reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
      } else {
        reject(this.log.critical('Vaga', HttpCode.Bad_Request, HttpMessage.Not_Found, undefined));
      }
    });
  }

  getById(id: number): Promise<ParkingSpace> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingSpace) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  getByParkinkId(id: number): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then((result: ParkingSpace[]) => resolve(result))
        .catch(error => {
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
        });
    });
  }

  save(parkingSpace: ParkingSpace, action): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let total = Number(parkingSpace.amount);
      let exists = await (await this.repository.getListByParkingId(parkingSpace.parkingId)).filter(x => x.type === parkingSpace.type);
      let count = parkingSpace.amount - exists.length;

      if (action === 'update') {
        parkingSpace.status = TransactionType.ACTIVE;
        await this.updateAll(parkingSpace, TransactionType.ACTIVE);

        if (count > 0) {
          parkingSpace.amount = count;
          await this.updateAll(parkingSpace, TransactionType.DELETED);
        }
      }

      exists = await (await this.repository.getListByParkingId(parkingSpace.parkingId)).filter(x => x.type === parkingSpace.type);
      count = total - exists.length;
      if (exists.length === 0 || count > 0 && action === 'update') {
        try {
          for (let x = 1; x <= count; x++) {
            await this.repository.save(new ParkingSpace(parkingSpace));
            if (x === count) { resolve(); }
          }
        } catch (error) {
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)));
        }
      } else if (count < 0 && action === 'update') {
        parkingSpace.status = TransactionType.DELETED;
        parkingSpace.amount = (count * -1);
        this.updateAll(parkingSpace, TransactionType.ACTIVE)
          .then(() => resolve());
      }
      else if (exists.length !== 0 && action === 'save') {
        reject(this.log.error('Vaga', HttpCode.Bad_Request, HttpMessage.Already_Exists, undefined))
      } else {
        resolve();
      }
    });
  }

  update(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.updateAll(new ParkingSpace(parkingSpace), TransactionType.ACTIVE)
        .then(result => resolve(result))
        .catch(error =>
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  updateAll(parkingSpace: ParkingSpace, status: TransactionType): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.updateAll(new ParkingSpace(parkingSpace), status)
        .then(result => resolve(result))
        .catch(error =>
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  toList(parkingId: number): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingSpace[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }
}
