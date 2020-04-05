import { Sequelize } from 'sequelize';
import * as Config from '../config.json';

var _dbConfig = Config.Database.MySql;

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
<<<<<<< HEAD
<<<<<<< HEAD
        dialect: 'postgres',
        dialectOptions: {
=======
        dialect: 'mssql',
        dialectOptions: {
          options: {
            trustServerCertificate: true
          },
>>>>>>> 3e3f7e7eabf3155f996109b221823bebb1f8a0a6
          ssl: true
        }
=======
        dialect: 'mysql',
        // dialectOptions: {
        //   options: {
        //     trustServerCertificate: true
        //   },
        //   ssl: true
        // }
>>>>>>> models
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