import { ParkingProduct } from '../../models/parking-product.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @interface IParkingProductService
 */
export interface IParkingProductService {

  save(parkingProduct: ParkingProduct): Promise<any>;
  update(parkingProduct: ParkingProduct): Promise<any>;
  toList(parkingId: number): Promise<ParkingProduct[]>;
  getById(id: number): Promise<ParkingProduct>;
  getByParkinkId(id: number): Promise<ParkingProduct[]>;
  delete(id: number): Promise<any>;

}