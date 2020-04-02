import { DateTimeNow } from "../data/models/innerDate";
const clc = require("cli-color");
const error = clc.red.bold;
const warn = clc.yellow;
const info = clc.blue;

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
    console.log(info(`${DateTimeNow()} INFO [${entity.constructor.name}] ${message}`));
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
    console.log(warn(`${DateTimeNow()} WARN [${entity.constructor.name}] ${message}`));
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
    console.log(error(`${DateTimeNow()} ERROR [${entity.constructor.name}] ${message}`));
  }
}

export default Logger;