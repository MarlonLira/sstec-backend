import { injectable, inject, id } from "inversify";
import TYPES from "../types";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { IParkingAdressService } from "../interfaces/IServices/parking-adressService.interface";
import ParkingAdress from "../models/parking-adress.model";
import { IParkingAdressRepository } from "../interfaces/IRepositories/parking-adressRepository.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class ParkingAdressService
 * @implements {IParkingAdressService}
 */
@injectable()
export class ParkingAdressService implements IParkingAdressService {

  constructor(
    @inject(TYPES.IParkingAdressRepository) private repository: IParkingAdressRepository,
    @inject(TYPES.ILogService) private log: ILogService) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<ParkingAdress>}
   * @memberof ParkingAdressService
   */
  getById(id: number): Promise<ParkingAdress> {
    throw new Error("Method not implemented.");
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<ParkingAdress>}
   * @memberof ParkingAdressService
   */
  getByParkingId(id: number): Promise<ParkingAdress> {
    return new Promise((resolve, reject) => {
      this.repository.getByParkingId(id)
        .then(async (result: ParkingAdress) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {ParkingAdress} parkingAdress
   * @returns {Promise<any>}
   * @memberof ParkingAdressService
   */
  save(parkingAdress: ParkingAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parkingAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {ParkingAdress} parkingAdress
   * @returns {Promise<any>}
   * @memberof ParkingAdressService
   */
  update(parkingAdress: ParkingAdress): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.update(parkingAdress)
        .then((result: any) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Parking', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }
}
