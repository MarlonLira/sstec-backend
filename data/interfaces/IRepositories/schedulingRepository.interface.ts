import { Scheduling } from "../../models/scheduling.model";

export interface ISchedulingRepository {
  save(scheduling: Scheduling): Promise<any>;
  getById(id: number): Promise<Scheduling>;
  getByUserId(userId: number): Promise<Scheduling[]>;
  getByParkingId(_parkingId: number): Promise<Scheduling[]>;
  getByCompanyId(_companyId: number): Promise<Scheduling[]>;
  returnIfExists(scheduling: Scheduling): Promise<Scheduling[]>;
  delete(_id: number): Promise<any>;
  update(scheduling: Scheduling): Promise<any>;
}