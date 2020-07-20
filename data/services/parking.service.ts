import { injectable, inject, id } from "inversify";
import { IParkingRepository } from "../interfaces/IRepositories/parkingRepository.interface";
import TYPES from "../types";
import { IParkingService } from "../interfaces/IServices/parkingService.interface";
import Parking from "../models/parking.model";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class ParkingService
 * @implements {IParkingService}
 */
@injectable()
export class ParkingService implements IParkingService {

  /**
   * Creates an instance of ParkingService.
   * @author Marlon Lira
   * @param {IParkingRepository} repository
   * @memberof ParkingService
   */
  constructor(@inject(TYPES.IParkingRepository) private repository: IParkingRepository) { }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<Parking>}
   * @memberof ParkingService
   */
  getById(id: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: Parking) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof ParkingService
   */
  save(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parking)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Parking} parking
   * @returns {Promise<any>}
   * @memberof ParkingService
   */
  update(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => [
      this.repository.update(parking)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    ]);
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<any>}
   * @memberof ParkingService
   */
  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {Parking} parking
   * @returns {Promise<Parking[]>}
   * @memberof ParkingService
   */
  getByRegistryCode(parking: Parking): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      if (Attributes.IsValid(parking.companyId) && Attributes.IsValid(parking.registryCode)) {
        this.repository.getByRegistryCode(parking.companyId, parking.registryCode)
          .then((result: Parking[]) => resolve(result))
          .catch((error: any) => reject(error));
      } else {
        reject(HttpMessage.Parameters_Not_Provided);
      }
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} employeeId
   * @returns {Promise<Parking[]>}
   * @memberof ParkingService
   */
  getByEmployeeId(employeeId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmployeeId(employeeId)
        .then((result: Parking[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  /**
   * @description
   * @author Marlon Lira
   * @param {number} companyId
   * @returns {Promise<Parking[]>}
   * @memberof ParkingService
   */
  toList(companyId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(companyId)
        .then((result: Parking[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}