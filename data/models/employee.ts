import { Model, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';
import { Attributes } from '../../commons/helpers';

var _instance = new DbInstance().getInstance();

class Employee extends Model {
  public id!: number;
  public status: string;
  public name!: string;
  public registryCode!: string;
  public email!: string;
  public password: string;

  constructor(json?: any) {
    super()
    if (json != undefined) {
      this.id = Attributes.ReturnIfValid(json.id);
      this.name = Attributes.ReturnIfValid(json.name);
      this.status = Attributes.ReturnIfValid(json.status);
      this.registryCode = Attributes.ReturnIfValid(json.registryCode);
      this.password = Attributes.ReturnIfValid(json.password);
      this.email = Attributes.ReturnIfValid(json.email);
    }
  }
}

Employee.init({
  id: {
    type: new DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.CHAR(2),
    allowNull: false
  },
  name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  registryCode: {
    type: new DataTypes.STRING(14),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(100)
  },
  email: {
    type: new DataTypes.STRING(50)
  }
}, {
  sequelize: _instance,
  tableName: 'Employee',
});

export default Employee;