import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import * as db from '../db';
import IEntitie from './IEntitie';
import {DbInstance} from '../db'

var _instance = new DbInstance().getInstance();

class ClientMdl {
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
}

class Client extends Model implements IEntitie{

    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    Save(value) {
        _instance.sync()
        .then(() => Client.create({
            firstName: value.firstName,
            lastName: value.lastName,
            phone: value.phone
        }))
        .then(j => {
        console.log(j.toJSON());
        });
    }
    Search(value) {
        var result = null;
        result =_instance.sync()
        .then(() => Client.scope("public").findAll({
            where:{
                firstName: value.firstName,
                lastName: value.lastName
            }
        }))
        .then(j => {
            console.log(j);
            });

        //console.log(result.toJSON());
        return result;
       
    }
    Update() {
        throw new Error("Method not implemented.");
    }
    Delete() {
        throw new Error("Method not implemented.");
    }
}

Client.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    firstName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    lastName: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    phone: {
        type: new DataTypes.STRING(12),
        allowNull: false,
    }
},{
    sequelize: new db.DbInstance().getInstance(),
    tableName: 'Client',
    scopes: {
        public: {
            attributes: ['id', 'firstName', 'lastName', 'phone']
        }
    }
});

Client.sync({force: false});

export {Client, ClientMdl};