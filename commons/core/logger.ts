import { DateTimeNow } from "./innerDate";
import * as clc from 'cli-color';

const error = clc.red.bold;
const warn = clc.yellow.bold;
const info = clc.blue.bold;

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
    let name = entity.constructor.name;
    console.log(info(`${DateTimeNow()} INFO [${name == undefined || name == 'String' ? entity : name}] ${message}`));
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
    let name = entity.constructor.name;
    console.log(warn(`${DateTimeNow()} WARN [${name == undefined || name == 'String' ? entity : name}] ${message}`));
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
    let name = entity.constructor.name;
    console.log(error(`${DateTimeNow()} ERROR [${name == undefined || name == 'String' ? entity : name}] ${message}`));
  }
}

export default Logger;