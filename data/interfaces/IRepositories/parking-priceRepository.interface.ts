import {ParkingPrice} from '../../models/parking-price.model';

export interface IParkingPriceRepository{
  save(model: ParkingPrice): Promise<any>;
  update(model: ParkingPrice): Promise<any>;
  getById(id: number): Promise<ParkingPrice>;
  delete(id: number): Promise<any>;
  getByParkingId(id: number): Promise<ParkingPrice[]>;
}