import { Scheduling } from "../../models/scheduling.model";

export interface ISchedulingService {
  save(scheduling: Scheduling): Promise<any>;
  update(scheduling: Scheduling): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<Scheduling>;
  getByUserId(id: number): Promise<Scheduling[]>;
  getByCompanyId(id: number): Promise<Scheduling[]>;
  getByParkingId(id: number): Promise<Scheduling[]>;
}