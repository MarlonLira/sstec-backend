import { SchedulingService } from "../../models/scheduling-service.model";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @interface ISchedulingServiceRepository
 */
export interface ISchedulingServiceRepository {
  save(schedulingService: SchedulingService): Promise<any>;
  getById(id: number): Promise<SchedulingService>;
  getBySchedulingId(schedulingId: number): Promise<SchedulingService[]>;
  getByParkingServiceId(parkingServiceId: number): Promise<SchedulingService[]>;
  delete(_id: number): Promise<any>;
  update(schedulingService: SchedulingService): Promise<any>;
}