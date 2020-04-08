import { Model, BelongsToManyAddAssociationMixin, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';

var _instance = DbInstance.getInstance()

class Items extends Model {
  public code!: number;
  public name!: string;
}

Items.init(
  {
    code: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  },
  { sequelize: _instance, modelName: 'Item', tableName: 'Item' },
);

export { Items }