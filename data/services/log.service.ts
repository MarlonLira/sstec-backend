import { injectable, inject } from "inversify";
import TYPES from "../types";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { Log } from "../models/log.model";
import { ILogRepository } from "../interfaces/IRepositories/logRepository.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { LogLevel } from "../../commons/enums/log-level";
import { Logger } from "../../commons/core/logger";
import * as Config from '../../config.json';
import { Attributes } from "../../commons/core/attributes";
const { IsError, IsWarn, IsCrit, IsUnkn, IsInfo } = Config.LogRecord;

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
      Logger.Default(log);
      if (log.isRecord) {
        this.repository.save(log)
          .then((result: Log) => resolve(result))
          .catch((error: any) => reject(error));
      }
    });
  }

  info(source: string, code: HttpCode, msg: string, obj: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new Log();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = Attributes.returnIfValid(obj, msg);
      _log.level = LogLevel.INFO;
      _log.isRecord = IsInfo;

      this.save(_log)
        .then(() => resolve(_log.obj))
        .catch((error: any) => resolve(error));
    });
  }

  warn(source: string, code: HttpCode, msg: string, obj: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new Log();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = Attributes.returnIfValid(obj, msg);
      _log.level = LogLevel.WARNING;
      _log.isRecord = IsWarn;

      this.save(_log)
        .then(() => resolve(_log.obj))
        .catch((error: any) => resolve(error));
    });
  }

  error(source: string, code: HttpCode, msg: string, obj: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new Log();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = Attributes.returnIfValid(obj, msg);
      _log.level = LogLevel.ERROR;
      _log.isRecord = IsError;

      this.save(_log)
        .then(() => resolve(_log.obj))
        .catch((error: any) => resolve(error));
    });
  }

  critical(source: string, code: HttpCode, msg: string, obj: any): Promise<any> {
    return new Promise((resolve) => {
      const _log = new Log();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.obj = Attributes.returnIfValid(obj, msg);
      _log.level = LogLevel.CRITICAL;
      _log.isRecord = IsCrit;

      this.save(_log)
        .then(() => resolve(_log.obj))
        .catch((error: any) => resolve(error));
    });
  }

  default(source: string, code: HttpCode, level: LogLevel, msg: string): Promise<any> {
    return new Promise((resolve) => {
      const _log = new Log();
      _log.source = source;
      _log.code = code;
      _log.message = msg;
      _log.level = LogLevel.UNKNOWN;
      _log.isRecord = IsUnkn;

      this.save(_log)
        .then(() => resolve(_log.obj))
        .catch((error: any) => resolve(error));
    });
  }

}
