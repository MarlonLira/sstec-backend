import { ParkingAddress } from '../../models/parking-address.model';

export interface IParkingAddressRepository {
  save(parkingAddress: ParkingAddress): Promise<any>;
  update(parkingAddress: ParkingAddress): Promise<any>;
  getById(id: number): Promise<ParkingAddress>;
  getByParkingId(parkingId: number): Promise<ParkingAddress>;
  delete(id: number): Promise<any>;
  toList(): Promise<ParkingAddress[]>
}