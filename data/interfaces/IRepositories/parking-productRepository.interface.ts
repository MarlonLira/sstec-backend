import { ParkingProduct } from '../../models/parking-product.model';

export interface IParkingProductRepository {
  save(parkingProduct: ParkingProduct): Promise<any>;
  update(parkingProduct: ParkingProduct): Promise<any>;
  toList(parkingId: number): Promise<ParkingProduct[]>;
  getById(id: number): Promise<ParkingProduct>;
  getByParkingId(id: number): Promise<ParkingProduct[]>;
  delete(id: number): Promise<any>;
}