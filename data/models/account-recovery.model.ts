import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { BaseModel, _instance } from './base.model';

export class AccountRecovery extends BaseModel {

  status: TransactionType;
  token: string;
  employeeId: number;
  userId: number;
  expirationDate: Date;

  constructor(json?: any) {
    super(json);
    if (json) {
      this.status = Attributes.returnIfValid(json.status);
      this.token = Attributes.returnIfValid(json.token);
      this.employeeId = Attributes.returnIfValid(json.employeeId);
      this.userId = Attributes.returnIfValid(json.userId);
      this.expirationDate = Attributes.returnIfValid(json.expirationDate);
    }
  }

  ToAny() {
    return this.toJSON();
  }
}

AccountRecovery.init({
  token: {
    type: new DataTypes.STRING(20),
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2)
  },
  employeeId: {
    type: new DataTypes.INTEGER()
  },
  userId: {
    type: new DataTypes.INTEGER()
  },
  expirationDate: {
    type: new DataTypes.DATE()
  },
}, {
  sequelize: _instance,
  tableName: 'AccountRecovery'
});