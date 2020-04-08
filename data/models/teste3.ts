import { Model, BelongsToManyAddAssociationMixin, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';

var _instance = DbInstance.getInstance()


class OrderItem extends Model {
  public orderId!: number;
  public itemCode!: number;
}
OrderItem.init({}, { sequelize: _instance, modelName: 'Order_Item', tableName: 'Order_Item' });


export { OrderItem }