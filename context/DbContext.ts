import { Sequelize } from 'sequelize';
import * as dbConfig from '../configs/DbConfig.json';

var _instance = null;

class DbContext {

  private port: number;
  private host: string;
  private Schema: string;
  private userName: string;
  private password: string;

  constructor() {
    this.userName = dbConfig.MSSQL.username;
    this.password = dbConfig.MSSQL.password;
    this.host = dbConfig.MSSQL.host;
    this.Schema = dbConfig.MSSQL.schema;
    this.port = dbConfig.MSSQL.port;
  }

  getNewInstance() {
    const sequelize = new Sequelize(this.Schema, this.userName, this.password,
      {
        port: this.port,
        host: this.host,
        dialect: 'mssql',
        ssl: true
      }
    );
    return sequelize;
  }
}

class DbInstance {
  getInstance() {
    return _instance ?? new DbContext().getNewInstance();
  }
}

export { DbInstance }