import { Sequelize } from 'sequelize';
import * as Config from '../config.json';

var _logging = Config.Database.Logging;
var _dbConfig = Config.Database.MSSQL;

/**
 * @description
 * @author Marlon Lira
 * @class Context
 */
class Context {

  private port: number;
  private host: string;
  private Schema: string;
  private userName: string;
  private password: string;

  /**
   *Creates an instance of Context.
   * @author Marlon Lira
   * @memberof Context
   */
  constructor() {
    this.userName = _dbConfig.username;
    this.password = _dbConfig.password;
    this.host = _dbConfig.host;
    this.Schema = _dbConfig.schema;
    this.port = _dbConfig.port;
  }

  /**
   * @description
   * @author Marlon Lira
   * @returns
   * @memberof Context
   */
  CreateInstance() {
    const sequelize = new Sequelize(this.Schema, this.userName, this.password,
      {
        port: this.port,
        host: this.host,
        dialect: 'mssql',
        logging: _logging,
        // dialectOptions: {
        //   options: {
        //     trustServerCertificate: true
        //   },
        //   ssl: true
        // }
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
  getInstance = () => this.CreateInstance();
}

export { DbInstance }