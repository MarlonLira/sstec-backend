import { SchedulingProduct } from "../../models/scheduling-product.model";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @interface ISchedulingProductRepository
 */
export interface ISchedulingProductRepository {
  save(schedulingProduct: SchedulingProduct): Promise<any>;
  getById(id: number): Promise<SchedulingProduct>;
  getBySchedulingId(schedulingId: number): Promise<SchedulingProduct[]>;
  getByParkingProductId(parkingProductId: number): Promise<SchedulingProduct[]>;
  delete(_id: number): Promise<any>;
  update(schedulingProduct: SchedulingProduct): Promise<any>;
}