import { ParkingSpace } from '../../models/parking-space.model';
import { Scheduling } from '../../models/scheduling.model';

export interface IParkingSpaceService {
  save(parkingSpace: ParkingSpace, action: 'save' | 'update'): Promise<any>;
  update(parkingSpace: ParkingSpace): Promise<any>;
  toList(parkingId: number): Promise<ParkingSpace[]>;
  getById(id: number): Promise<ParkingSpace>;
  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]>;
  getByParkinkId(id: number): Promise<ParkingSpace[]>;
  deleteGroupType(parkingSpace: ParkingSpace): Promise<any>;
}