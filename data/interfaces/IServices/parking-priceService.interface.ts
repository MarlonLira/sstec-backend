import {ParkingPrice} from '../../models/parking-price.model';

export interface IParkingPriceService{

  getById(id: number): Promise<ParkingPrice>;
  save(parkingPrice: ParkingPrice): Promise<any>;
  update(parkingPrice: ParkingPrice): Promise<any>;
  delete(id: number): Promise<any>;
  toList(parkingId: number): Promise<ParkingPrice[]>;

}