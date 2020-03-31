import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../context/DbContext';
import { Attributes } from '../commons/Helpers';
import { InnerDate } from '../models/InnerDate';
import * as Config from '../config.json';

var _reSync = Config.Database.ForceSync;

var _instance = new DbInstance().getInstance();

class BillingCycle extends Model {
  id!: number;
  clientId!: number;
  credit!: number;
  debit!: number;
  date!: string;
  client!: any;
  innerDate!: InnerDate;

  constructor(json?: any) {
    super();
    this.id = Attributes.ReturnIfValid(json.id);
    this.clientId = Attributes.ReturnIfValid(json.clientId);
    this.credit = Attributes.ReturnIfValid(json.credit, 0);
    this.debit = Attributes.ReturnIfValid(json.debit, 0);
    this.date = Attributes.ReturnIfValid(json.date);
    this.innerDate = new InnerDate(Attributes.ReturnIfValid(json.date));
  }
}

BillingCycle.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  credit: {
    type: new DataTypes.FLOAT
  },
  debit: {
    type: new DataTypes.FLOAT
  },
  date: {
    type: new DataTypes.STRING(10),
    allowNull: false
  },
  clientId: {
    type: new DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize: _instance,
  tableName: 'billingCycle',
  scopes: {
    public: {
      attributes: ['clientId', 'credit', 'debit', 'date']
    },
    consolidated: {
      attributes: ['credit', 'debit']
    }
  }
});

BillingCycle.sync({ force: _reSync });

export { BillingCycle }