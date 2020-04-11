import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import Attributes from "../commons/core/attributes";;

var _logging = Config.Database.Logging;
var _dbConfig = Config.Database.PostgreSQL;

/**
 * @description
 * @author Marlon Lira
 * @class Context
 */
class Context {

  protected static _instance: Sequelize;
  /**
   * @description
   * @author Marlon Lira
   * @returns
   * @memberof Context
   */
  static CreateInstance() {
    const sequelize = new Sequelize(_dbConfig.schema, _dbConfig.username, _dbConfig.password,
      {
        port: _dbConfig.port,
        host: _dbConfig.host,
        dialect: 'postgres',
        logging: _logging,
        native: false,
        dialectOptions: {
          ssl: {
            rejectUnauthorized: false,
          }
        }
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
   * @description
   * @memberof DbInstance
   */
  static getInstance() {
    this._instance = Attributes.ReturnIfValid(this._instance, this.CreateInstance());
    return this._instance;
  }
}

export { DbInstance }
