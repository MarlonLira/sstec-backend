import { ParkingPrice } from '../../models/parking-price.model';

export interface IParkingPriceService {
  getById(id: number): Promise<ParkingPrice>;
  save(item: ParkingPrice): Promise<any>;
  update(item: ParkingPrice): Promise<any>;
  delete(id: number): Promise<any>;
  getByParkingId(id: number): Promise<ParkingPrice[]>;
}