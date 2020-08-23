import { DateTimeNow } from "./innerDate";
import * as clc from 'cli-color';
import { Log } from "../../data/models/log.model";
import { LogLevel } from "../enums/log-level";

const error = clc.red.bold;
const warn = clc.yellow.bold;
const crit = clc.magenta.bold;
const info = clc.blue.bold;
const unkn = clc.cyan.bold;

/**
 * @description
 * @author Marlon Lira
 * @class Logger
 */
class Logger {

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {string} message
   * @memberof Logger
   */
  static Info(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(info(`${DateTimeNow()} INFO [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {string} message
   * @memberof Logger
   */
  static Warn(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(warn(`${DateTimeNow()} WARN [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {string} message
   * @memberof Logger
   */
  static Error(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(error(`${DateTimeNow()} ERROR [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {string} message
   * @memberof Logger
   */
  static Critical(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(crit(`${DateTimeNow()} CRIT [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {string} message
   * @memberof Logger
   */
  static Unknown(entity: any, message: string) {
    const name = entity.constructor.name;
    // tslint:disable-next-line: no-console
    console.log(unkn(`${DateTimeNow()} UNKN [${name === undefined || name === 'String' ? entity : name}] ${message}`));
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {Log} log
   * @returns
   * @memberof Logger
   */
  static Default(log: Log) {
    switch (log.level) {
      case LogLevel.ERROR:
        return Logger.Error(log.source, log.message);
      case LogLevel.WARNING:
        return Logger.Warn(log.source, log.message);
      case LogLevel.CRITICAL:
        return Logger.Critical(log.source, log.message);
      case LogLevel.UNKNOWN:
        return Logger.Unknown(log.source, log.message);
      case LogLevel.INFO:
        return Logger.Info(log.source, log.message);
      default:
        return Logger.Unknown(log.source, log.message);
    }
  }
}

export default Logger;