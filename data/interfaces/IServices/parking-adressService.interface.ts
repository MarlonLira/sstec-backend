import { ParkingAdress } from '../../models/parking-adress.model';

export interface IParkingAdressService {

  getById(id: number): Promise<ParkingAdress>;
  getByParkingId(id: number): Promise<ParkingAdress>;
  save(parkingAdress: ParkingAdress): Promise<any>;
  update(parkingAdress: ParkingAdress): Promise<any>;
  toList(): Promise<ParkingAdress[]>;
}