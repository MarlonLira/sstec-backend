import { SchedulingService } from "../../models/scheduling-service.model";

export interface ISchedulingServiceRepository {
  save(schedulingService: SchedulingService): Promise<any>;
  getById(id: number): Promise<SchedulingService>;
  delete(_id: number): Promise<any>;
  update(schedulingService: SchedulingService): Promise<any>;
}