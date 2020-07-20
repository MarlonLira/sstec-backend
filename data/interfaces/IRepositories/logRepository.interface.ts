import { Log } from "../../models/logger.model";


export interface ILogRepository {
  toList(companyId: number): Promise<Log[]>;
  save(log: Log): Promise<any>;
}