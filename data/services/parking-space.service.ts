import { injectable, inject } from "inversify";
import TYPES from "../types";
import { Parking } from "../models/parking.model";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { ParkingAdress } from "../models/parking-adress.model";
import { IParkingSpaceService } from "../interfaces/IServices/parkingSpaceService.interface";
import IParkingSpaceRepository from "../interfaces/IRepositories/parking-spaceRepository.interface";
import ParkingSpace from "../models/parking-space.model";
import Scheduling from "../models/scheduling.model";
import { TransactionType } from "../../commons/enums/transactionType";
import { any } from "sequelize/types/lib/operators";

@injectable()
export class ParkingSpaceService implements IParkingSpaceService {

  constructor(
    @inject(TYPES.IParkingSpaceRepository) private repository: IParkingSpaceRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  getByParkingId(parkingId: number): Promise<ParkingSpace[]> {
    throw new Error("Method not implemented.");
  }
  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]> {
    throw new Error("Method not implemented.");
  }
  toGroupedList(parkingSpace: ParkingSpace): Promise<ParkingSpace[]> {
    throw new Error("Method not implemented.");
  }
  deleteGroupType(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise((resolve, reject) => {
      if (Attributes.IsValid(parkingSpace)) {
        this.repository.deleteGroupType(parkingSpace)
          .then(result => resolve(result))
          .catch(error =>
            reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
      } else {
        reject(this.log.critical('Vaga', HttpCode.Bad_Request, HttpMessage.Not_Found, undefined));
      }
    });
  }

  getById(id: number): Promise<ParkingSpace> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingSpace) => {
          const _result: any = result.ToModify();
          resolve(_result);
        })
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking Space', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  save(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = [];
        if (Attributes.IsValid(parkingSpace.amount)) {
          const listEx: ParkingSpace[] = (await this.repository.getDeletedByParkingId(parkingSpace));
          const rest = parkingSpace.amount - listEx.length;
          if (Attributes.IsValid(listEx)) {
            listEx.forEach(async (foundParkingSpace: ParkingSpace) => {
              foundParkingSpace.value = parkingSpace.value;
              foundParkingSpace.status = TransactionType.ACTIVE;
              this.repository.update(foundParkingSpace);
              result.push(foundParkingSpace.id);
            });
          }
          if (listEx.length < parkingSpace.amount) {
            for (let i = 0; i < rest; i++) {
              result.push(await this.repository.save(parkingSpace));
            };
          }
          await this.updateAll(parkingSpace);
          resolve(result);
        } else {
          reject(await this.log.critical('Vaga', HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, undefined));
        }
      } catch (error) {
        reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
      };
    });
  }

  update(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise((resolve, reject) => {
      const result = new ParkingSpace(parkingSpace);
      if (Attributes.IsValid(result.parkingId)) {
        this.updateAll(result)
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
          })
      } else {
        reject(this.log.critical('Vaga', HttpCode.Bad_Request, HttpMessage.Parameters_Not_Provided, undefined));
      }
    });
  }

  toList(parkingId: number): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingSpace[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  updateAll(_parkingSpace: ParkingSpace) {
    return new Promise((resolve) => {
      const result = [];
      this.repository.getByParkingId(_parkingSpace.parkingId)
        .then((parkingSpaces: ParkingSpace[]) => {
          const foundParkingSpaces = parkingSpaces.filter(ps => ps.type === _parkingSpace.type);
          if (Attributes.IsValid(foundParkingSpaces)) {
            foundParkingSpaces.forEach(async (parkingspace: ParkingSpace) => {
              parkingspace.type = Attributes.ReturnIfValid(_parkingSpace.type);
              parkingspace.value = Attributes.ReturnIfValid(_parkingSpace.value);
              await this.repository.update(parkingspace);
              result.push(parkingspace.id);
            });
          }
          resolve(result);
        });
    });
  }

}
