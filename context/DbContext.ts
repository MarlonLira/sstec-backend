import { Sequelize } from 'sequelize';
import * as dbConfig from '../commons/configs/DbConfig.json';

var _instance = null;
var _dbConfig = dbConfig.PostgreSQL;

class DbContext {

  private port: number;
  private host: string;
  private Schema: string;
  private userName: string;
  private password: string;

  constructor() {
    this.userName = _dbConfig.username;
    this.password = _dbConfig.password;
    this.host = _dbConfig.host;
    this.Schema = _dbConfig.schema;
    this.port = _dbConfig.port;
  }

  getNewInstance() {
    const sequelize = new Sequelize(this.Schema, this.userName, this.password,
      {
        port: this.port,
        host: this.host,
        dialect: 'postgres',
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