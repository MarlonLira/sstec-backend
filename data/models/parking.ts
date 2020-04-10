import { Model, DataTypes } from 'sequelize';

import { DbInstance } from '../../main/context';
import Attributes from '../../commons/core/attributes';

var _instance = DbInstance.getInstance()

/**
 * @description
 * @author Emerson Souza
 * @class Parking
 * @extends {Model}
 */
class Parking extends Model {
    id!: number;
    status: string;
    name: string;
    registryCode: string;
    phone: string;
    email: string;
    amount: number;
    imgUrl: string;

    /**
     *Creates an instance of Parking.
     * @author Emerson Souza
     * @param {*} [json]
     * @memberof Parking
     */
    constructor(json?: any) {
        super()
        this.id = Attributes.ReturnIfValid(json.id, 0);
        this.status = Attributes.ReturnIfValid(json.status);
        this.name = Attributes.ReturnIfValid(json.name);
        this.registryCode = Attributes.ReturnIfValid(json.registryCode);
        this.phone = Attributes.ReturnIfValid(json.phone);
        this.email = Attributes.ReturnIfValid(json.email);
        this.amount = Attributes.ReturnIfValid(json.amount);
        this.imgUrl = Attributes.ReturnIfValid(json.imgUrl);
    }
}

Parking.init({
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
    phone: {
        type: new DataTypes.STRING(12)
    },
    email: {
        type: new DataTypes.STRING(50)
    },
    amount: {
        type: new DataTypes.DOUBLE
    },
    imgUrl: {
        type: new DataTypes.STRING(100),
    }
}, {
    sequelize: _instance,
    tableName: 'Parking'
});

export default Parking;