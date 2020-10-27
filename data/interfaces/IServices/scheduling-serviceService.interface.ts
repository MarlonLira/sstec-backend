import { SchedulingService } from "../../models/scheduling-service.model";

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @interface ISchedulingServiceService
 */
export interface ISchedulingServiceService {
  save(schedulingService: SchedulingService): Promise<any>;
  update(schedulingService: SchedulingService): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<SchedulingService>;
  getBySchedulingId(schedulingId: number): Promise<SchedulingService[]>;
  getByParkingServiceId(parkingServiceId: number): Promise<SchedulingService[]>;
}