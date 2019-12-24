import { Sequelize } from 'sequelize';
import { dbConfig } from './config';

var _instance = null;

class DbConnect {

  private port: number;
  private host: string;
  private Schema: string;
  private userName: string;
  private password: string;

  constructor(Schema, userName, password, host, port) {
    this.userName = userName;
    this.password = password;
    this.host = host;
    this.Schema = Schema;
    this.port = port;
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
    var db = new dbConfig();
    _instance = _instance ?? new DbConnect(db.schema, db.userName, db.password, db.host, db.port).getNewInstance();
    return _instance;
  }
}

export { DbInstance }