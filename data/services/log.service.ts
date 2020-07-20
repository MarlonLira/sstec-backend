import { injectable, inject } from "inversify";
import TYPES from "../types";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { Log } from "../models/logger.model";
import { ILogRepository } from "../interfaces/IRepositories/logRepository.interface";

@injectable()
export class LogService implements ILogService {

  constructor(@inject(TYPES.ILogRepository) private repository: ILogRepository) { }

  toList(companyId: number): Promise<import("../models/logger.model").Log[]> {
    throw new Error("Method not implemented.");
  }
  save(log: Log): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
