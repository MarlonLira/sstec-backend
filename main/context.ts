import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import Attributes from "../commons/core/attributes";

var _logging = Config.Database.Logging;
var _dbConfig = Config.Database.MySql;

/**
 * @description
 * @author Marlon Lira
 * @class Context
 */
class Context {

  protected static _instance: Sequelize;

  /**
   * @description Creates the database instance.
   * @author Marlon Lira
   * @static
   * @returns {Sequelize}
   * @memberof Context
   */
  static CreateInstance(): Sequelize {
    const sequelize = new Sequelize(_dbConfig.schema, _dbConfig.username, _dbConfig.password,
      {
        port: _dbConfig.port,
        host: _dbConfig.host,
        dialect: 'mysql',
        logging: _logging,
        omitNull: true,
      //   dialectOptions: {
      //     options: {
      //       trustServerCertificate: true
      //     },
      //     ssl: {
      //       rejectUnauthorized: false,
      //     }
      //   }
       }
    );
    return sequelize;
  }
}

/**
 * @description
 * @author Marlon Lira
 * @class DbInstance
 * @extends {Context}
 */
class DbInstance extends Context {

  /**
   * @description Returns the database instance.
   * @author Marlon Lira
   * @static
   * @returns {Sequelize}
   * @memberof DbInstance
   */
  static getInstance(): Sequelize {
    this._instance = Attributes.ReturnIfValid(this._instance, this.CreateInstance());
    return this._instance;
  }
}

export { DbInstance }
