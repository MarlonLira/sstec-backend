import { Log } from "../../models/log.model";
import { HttpCode } from "../../../commons/enums/httpCode";
import { LogLevel } from "../../../commons/enums/log-level";

export interface ILogService {
  toList(companyId: number): Promise<Log[]>;
  save(log: Log): Promise<any>;
  info(source: string, code: HttpCode, msg: string, obj: string): Promise<any>;
  warn(source: string, code: HttpCode, msg: string, obj: string): Promise<any>;
  error(source: string, code: HttpCode, msg: string, obj: string): Promise<any>;
  critical(source: string, code: HttpCode, msg: string, obj: string): Promise<any>;
  default(source: string, code: HttpCode, level: LogLevel, msg: string): Promise<any>;
}