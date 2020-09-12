import { injectable, inject } from "inversify";
import TYPES from "../types";
import Attributes from "../../commons/core/attributes";
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {Scheduling} scheduling
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceService
   */
  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      this.repository.getAvailable(scheduling)
        .then((result: ParkingSpace[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceService
   */
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} id
   * @returns {Promise<ParkingSpace>}
   * @memberof ParkingSpaceService
   */
  getById(id: number): Promise<ParkingSpace> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then(async (result: ParkingSpace) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceService
   */
  getByParkinkId(id: number): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then((result: ParkingSpace[]) => resolve(result))
        .catch(error => {
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
        });
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceService
   */
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

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} parkingSpace
   * @returns {Promise<any>}
   * @memberof ParkingSpaceService
   */
  update(parkingSpace: ParkingSpace): Promise<any> {
    return new Promise((resolve, reject) => {
      const result = new ParkingSpace(parkingSpace);
      this.updateAll(result)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)));
        })
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {number} parkingId
   * @returns {Promise<ParkingSpace[]>}
   * @memberof ParkingSpaceService
   */
  toList(parkingId: number): Promise<ParkingSpace[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(parkingId)
        .then((result: ParkingSpace[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Vaga', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  /**
   * @description
   * @author Gustavo Gusmão
   * @param {ParkingSpace} _parkingSpace
   * @returns
   * @memberof ParkingSpaceService
   */
  updateAll(_parkingSpace: ParkingSpace) {
    return new Promise((resolve) => {
      const result = [];
      this.repository.getByParkingId(_parkingSpace.id)
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
