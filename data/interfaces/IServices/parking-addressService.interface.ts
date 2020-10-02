import { ParkingAddress } from '../../models/parking-address.model';

export interface IParkingAddressService {

  getById(id: number): Promise<ParkingAddress>;
  getByParkingId(id: number): Promise<ParkingAddress>;
  save(parkingAddress: ParkingAddress): Promise<any>;
  update(parkingAddress: ParkingAddress): Promise<any>;
  toList(): Promise<ParkingAddress[]>;
}