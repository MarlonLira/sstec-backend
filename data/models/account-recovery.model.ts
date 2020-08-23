import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';

const _instance = Context.getInstance();

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class AccountRecovery
 * @extends {Model}
 */
export class AccountRecovery extends Model {

  status: TransactionType;
  token: string;
  employeeId: number;
  userId: number;
  expirationDate: Date;

  /**
   * Creates an instance of AccountRecovery.
   * @author Marlon Lira
   * @param {*} [json]
   * @memberof AccountRecovery
   */
  constructor(json?: any) {
    super()
    if (json) {
      this.status = Attributes.ReturnIfValid(json.status);
      this.token = Attributes.ReturnIfValid(json.token);
      this.employeeId = Attributes.ReturnIfValid(json.employeeId);
      this.userId = Attributes.ReturnIfValid(json.userId);
      this.expirationDate = Attributes.ReturnIfValid(json.expirationDate);
    }
  }

  ToModify() {
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