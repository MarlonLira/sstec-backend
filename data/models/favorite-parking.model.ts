import { Model, DataTypes } from 'sequelize';

import Context from '../../main/context';
import Attributes from '../../commons/core/attributes';

const _instance = Context.getInstance();

export class FavoriteParking extends Model {

    id!: number;
    userId: number;
    parkingId: number;

    constructor(json?: any) {
        super()
        this.id = Attributes.ReturnIfValid(json.id);
        this.userId = Attributes.ReturnIfValid(json.userId);
        this.parkingId = Attributes.ReturnIfValid(json.parkingId);
    }

    ToAny() {
        return this.toJSON();
    }
}

FavoriteParking.init({
    id: {
        type: new DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: new DataTypes.INTEGER(),
        allowNull: false
    },
    parkingId: {
        type: new DataTypes.INTEGER(),
        allowNull: false
    }
}, {
    sequelize: _instance,
    tableName: 'FavoriteParking'
});