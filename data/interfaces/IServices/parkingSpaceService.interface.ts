import ParkingSpace from '../../models/parking-space.model';
import Scheduling from '../../models/scheduling.model';

export interface IParkingSpaceService {

  save(parkingSpace: ParkingSpace): Promise<any>;

  update(parkingSpace: ParkingSpace): Promise<any>;

  toList(parkingId: number): Promise<ParkingSpace[]>;

  getById(id: number): Promise<ParkingSpace>;

  getByParkingId(parkingId: number): Promise<ParkingSpace[]>;

  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]>;

  toGroupedList(parkingSpace: ParkingSpace): Promise<ParkingSpace[]>;

  deleteGroupType(parkingSpace: ParkingSpace): Promise<any>;

}