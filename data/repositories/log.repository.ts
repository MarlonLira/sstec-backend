import { injectable } from "inversify";

import { ILogRepository } from "../interfaces/IRepositories/logRepository.interface";
import { Log } from "../models/logger.model";

@injectable()
export class LogRepository implements ILogRepository {

  save(log: Log): Promise<any> {
    throw new Error("Method not implemented.");
  }

  toList(companyId: number): Promise<Log[]> {
    throw new Error("Method not implemented.");
  }

}