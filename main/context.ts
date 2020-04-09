import { Sequelize } from 'sequelize';
import * as Config from '../config.json';
import { Attributes } from '../commons/helpers';

var _logging = Config.Database.Logging;
var _dbConfig = Config.Database.MSSQL;

/**
 * @description
 * @author Marlon Lira
 * @class Context
 */
class Context {

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
        dialect: 'mssql',
        logging: _logging,
        dialectOptions: {
          options: {
            trustServerCertificate: true
          },
          ssl: true
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

  private static _instance: Sequelize;

  /**
   * @description
   * @memberof DbInstance
   */
  static getInstance() {
    this._instance = !Attributes.IsValid(this._instance) ? this.CreateInstance() : this._instance;
    return this._instance;
  }
}

export { DbInstance }