import { Log } from "../../models/log.model";


export interface ILogRepository {
  toList(companyId: number): Promise<Log[]>;
  save(log: Log): Promise<any>;
}