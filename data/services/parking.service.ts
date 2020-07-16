import { injectable, inject, id } from "inversify";
import { IParkingRepository } from "../interfaces/IRepositories/IParkingRepository";
import TYPES from "../types";
import { IParkingService } from "../interfaces/IServices/IParking.service";
import Parking from "../models/parking";
import Attributes from "../../commons/core/attributes";
import { HttpMessage } from "../../commons/enums/httpMessage";


@injectable()
export class ParkingService implements IParkingService {

  constructor(@inject(TYPES.IParkingRepository) private repository: IParkingRepository) { }

  getById(id: number): Promise<Parking> {
    return new Promise((resolve, reject) => {
      this.repository.getById(id)
        .then((result: Parking) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  save(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(parking)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  update(parking: Parking): Promise<any> {
    return new Promise((resolve, reject) => [
      this.repository.update(parking)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error))
    ]);
  }

  delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.delete(id)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

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

  getByEmployeeId(employeeId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.getByEmployeeId(employeeId)
        .then((result: Parking[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  toList(companyId: number): Promise<Parking[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(companyId)
        .then((result: Parking[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }
}
