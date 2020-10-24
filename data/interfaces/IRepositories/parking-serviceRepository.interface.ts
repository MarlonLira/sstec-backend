import { ParkingService } from '../../models/parking-service.model';

export interface IParkingServiceRepository {
  save(parkingService: ParkingService): Promise<any>;
  update(parkingService: ParkingService): Promise<any>;
  toList(parkingId: number): Promise<ParkingService[]>;
  getById(id: number): Promise<ParkingService>;
  getByParkingId(id: number): Promise<ParkingService[]>;
  delete(id: number): Promise<any>;
}