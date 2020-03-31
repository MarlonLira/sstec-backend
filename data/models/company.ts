import { Model, DataTypes } from 'sequelize';

import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/Helpers';
import * as Config from '../../config.json';

var _reSync = Config.Database.ForceSync;
var _instance = new DbInstance().getInstance();

class Company {
  
}