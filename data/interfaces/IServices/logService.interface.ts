import { Log } from "../../models/logger.model";

export interface ILogService {
  toList(companyId: number): Promise<Log[]>;
  save(log: Log): Promise<any>;
}