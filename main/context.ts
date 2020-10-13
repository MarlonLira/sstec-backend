import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import Attributes from "../commons/core/attributes";

const _logging = Config.Database.Logging;
const _dbConfig = Config.Database.MySqlWEB;

/**
 * @description
 * @author Marlon Lira
 * @class Context
 */
class Context {

  private static _instance: Sequelize;

  /**
   * @description Creates the database instance.
   * @author Marlon Lira
   * @static
   * @returns {Sequelize}
   * @memberof Context
   */
  private static createInstance(): Sequelize {
    const sequelize = new Sequelize(_dbConfig.schema, _dbConfig.username, _dbConfig.password,
      {
        port: _dbConfig.port,
        host: _dbConfig.host,
        dialect: 'mysql',
        logging: _logging,
        omitNull: true,
        timezone: '-03:00',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    );
    return sequelize;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @returns {Sequelize}
   * @memberof Context
   */
  public static getInstance(): Sequelize {
    this._instance = Attributes.ReturnIfValid(this._instance, this.createInstance());
    return this._instance;
  }
}

export default Context;
