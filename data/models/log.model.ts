import { DataTypes } from 'sequelize';

import { Attributes } from '../../commons/core/attributes';
import { LogLevel } from '../../commons/enums/log-level';
import { HttpCode } from '../../commons/enums/httpCode';
import { BaseModel, BaseModelDAO, _instance } from './base.model';
import { InnerJson } from '../../commons/core/innerJson';

export class Log extends BaseModel {

  id!: number;
  level: LogLevel;
  message: string;
  source: string;
  code: HttpCode;
  obj: string;
  isRecord: boolean;

  constructor(json?: any) {
    json = InnerJson.parse(json);
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.level = Attributes.returnIfValid(json.level);
      this.message = Attributes.returnIfValid(json.message);
      this.source = Attributes.returnIfValid(json.source);
      this.code = Attributes.returnIfValid(json.code);
      this.obj = Attributes.returnIfValid(json.obj);
      this.isRecord = Attributes.returnIfValid(json.isRecord);
    }
  }
}

export class LogDAO extends BaseModelDAO { }

LogDAO.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  level: {
    type: new DataTypes.STRING(15)
  },
  message: {
    type: new DataTypes.STRING(255)
  },
  source: {
    type: new DataTypes.STRING(20)
  },
  code: {
    type: new DataTypes.STRING(3)
  },
  obj: {
    type: new DataTypes.STRING(255)
  }
}, {
  sequelize: _instance,
  tableName: 'Log'
});