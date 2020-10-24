import { SchedulingService } from "../../models/scheduling-service.model";
import { Scheduling } from "../../models/scheduling.model";

export interface ISchedulingServiceService {
  save(schedulingService: SchedulingService): Promise<any>;
  update(schedulingService: SchedulingService): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<SchedulingService>;
  getByScheduling(scheduling: Scheduling): Promise<SchedulingService>;
}