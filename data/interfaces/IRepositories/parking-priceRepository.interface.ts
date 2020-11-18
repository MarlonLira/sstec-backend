import {ParkingPrice} from '../../models/parking-price.model';

export interface IParkingPriceRepository{
  save(parkingPrice: ParkingPrice): Promise<any>;
  update(parkingPrice: ParkingPrice): Promise<any>;
  toList(parkingId: number): Promise<ParkingPrice[]>;
  getById(id: number): Promise<ParkingPrice>;
  delete(id: number): Promise<any>;
}