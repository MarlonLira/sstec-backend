import { TransactionType } from '../../../commons/enums/transactionType';
import { ParkingSpace } from '../../models/parking-space.model';
import { Scheduling } from '../../models/scheduling.model';

export interface IParkingSpaceRepository {
  save(parkingSpace: ParkingSpace): Promise<any>;
  update(parkingSpace: ParkingSpace): Promise<any>;
  updateAll(parkingSpace: ParkingSpace, status: TransactionType): Promise<any>;
  toList(parkingId: number): Promise<ParkingSpace[]>;
  getById(id: number): Promise<ParkingSpace>;
  getByParkingId(id: number): Promise<ParkingSpace[]>;
  getAvailable(scheduling: Scheduling): Promise<ParkingSpace[]>;
  delete(id: number): Promise<any>;
  deleteGroupType(parkingSpace: ParkingSpace): Promise<any>;
  getDeletedByParkingId(_parkingspace: ParkingSpace): Promise<ParkingSpace[]>;
  getListByParkingId(id: number): Promise<ParkingSpace[]>;
}