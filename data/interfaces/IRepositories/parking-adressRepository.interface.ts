import { ParkingAdress } from '../../models/parking-adress.model';

export interface IParkingAdressRepository {
  save(parkingAdress: ParkingAdress): Promise<any>;
  update(parkingAdress: ParkingAdress): Promise<any>;
  getById(id: number): Promise<ParkingAdress>;
  getByParkingId(parkingId: number): Promise<ParkingAdress>;
  delete(id: number): Promise<any>;
  toList(): Promise<ParkingAdress[]>
}