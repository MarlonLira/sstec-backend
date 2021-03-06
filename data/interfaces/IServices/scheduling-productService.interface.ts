import { SchedulingProduct } from "../../models/scheduling-product.model";

export interface ISchedulingProductService {
  save(schedulingProduct: SchedulingProduct): Promise<any>;
  update(schedulingProduct: SchedulingProduct): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<SchedulingProduct>;
  getBySchedulingId(schedulingId: number): Promise<SchedulingProduct[]>;
  getByParkingProductId(parkingProductId: number): Promise<SchedulingProduct[]>;
}