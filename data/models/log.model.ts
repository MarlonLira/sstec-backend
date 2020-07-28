import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { LogLevel } from '../../commons/enums/log-level';
import { HttpCode } from '../../commons/enums/httpCode';

const _instance = Context.getInstance();

/**
 * @description
 * @author Marlon Lira
 * @class Logger
 * @extends {Model}
 */
export class Log extends Model {

  id!: number;
  level: LogLevel;
  message: string;
  source: string;
  code: HttpCode;


  /**
   * Creates an instance of Logger.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof Logger
   */
  constructor(json?: any) {
    super()
    if (json) {
      this.id = Attributes.ReturnIfValid(json.id);
      this.level = Attributes.ReturnIfValid(json.level);
      this.message = Attributes.ReturnIfValid(json.message);
      this.source = Attributes.ReturnIfValid(json.source);
      this.code = Attributes.ReturnIfValid(json.code);
    }
  }

  ToModify() {
    return this.toJSON();
  }
}

Log.init({
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
  date: {
    type: new DataTypes.DATE()
  },
  source: {
    type: new DataTypes.STRING(20)
  },
  code: {
    type: new DataTypes.STRING(3)
  }
}, {
  sequelize: _instance,
  tableName: 'Log'
});