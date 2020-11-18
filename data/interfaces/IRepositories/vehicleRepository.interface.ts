import { Vehicle } from '../../models/vehicle.model';

export interface IVehicleRepository {
  save(vehicle: Vehicle): Promise<any>;
  getById(id: number): Promise<Vehicle>
  getByUserId(userId: number): Promise<Vehicle[]>;
  getByLicensePlate(licensePlate: string): Promise<Vehicle>;
  delete(id: number): Promise<any>;
  update(vehicle: Vehicle): Promise<any>;
}