import { Model, BelongsToManyAddAssociationMixin, DataTypes } from 'sequelize';
import { DbInstance } from '../../main/context';
import { Items } from './teste2';

var _instance = DbInstance.getInstance()

class Orders extends Model {
  public id!: number;
  public addItem!: BelongsToManyAddAssociationMixin<Items, number>;
}
Orders.init({}, { sequelize: _instance, modelName: 'Order', tableName:'Order'  });


class OrderItem extends Model {
  public orderId!: number;
  public itemCode!: number;
}
OrderItem.init({}, { sequelize: _instance, modelName: 'Order_Item', tableName:'Order_Item'  });

// Orders.belongsToMany(Items, { through: OrderItem });
// Items.belongsToMany(Orders, { through: OrderItem });


export { Orders, OrderItem };