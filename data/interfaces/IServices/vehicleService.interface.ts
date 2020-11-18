import { Vehicle } from "../../models/vehicle.model";

export interface IVehicleService {
  getByUserId(userId: number): Promise<Vehicle[]>
  getById(id: number): Promise<Vehicle>;
  getByLicensePlate(_licensePlate: string): Promise<Vehicle[]>;
  save(vehicle: Vehicle): Promise<any>;
  update(vehicle: Vehicle): Promise<any>;
  delete(id: number): Promise<any>;
}