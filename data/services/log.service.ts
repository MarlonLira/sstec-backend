import { injectable, inject } from "inversify";
import TYPES from "../types";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { Log } from "../models/log.model";
import { ILogRepository } from "../interfaces/IRepositories/logRepository.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { LogLevel } from "../../commons/enums/log-level";

@injectable()
export class LogService implements ILogService {

  constructor(@inject(TYPES.ILogRepository) private repository: ILogRepository) { }

  toList(companyId: number): Promise<Log[]> {
    return new Promise((resolve, reject) => {
      this.repository.toList(companyId)
        .then((result: Log[]) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  save(log: Log): Promise<any> {
    return new Promise((resolve, reject) => {
      this.repository.save(log)
        .then((result: any) => resolve(result))
        .catch((error: any) => reject(error));
    });
  }

  info(source: string, code: HttpCode, msg: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  warn(source: string, code: HttpCode, msg: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  error(source: string, code: HttpCode, msg: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const _log = new Log();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.level = LogLevel.ERROR;

      this.save(_log)
        .then(() => resolve(_log.message))
        .catch((error: any) => resolve(error));
    });
  }
  critical(source: string, code: HttpCode, msg: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  default(source: string, code: HttpCode, level: LogLevel, msg: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
