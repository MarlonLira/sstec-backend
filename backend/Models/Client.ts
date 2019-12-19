import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import * as db from '../db';
import IEntitie from './IEntitie';
import {DbInstance} from '../db'

var _instance = new DbInstance().getInstance();

class ClientMdl {
    public id!: number;
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

    Save(value : ClientMdl) {
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
    Search(value : ClientMdl) {
        var result = new ClientMdl();
        var _ = _instance.sync()
        .then(() => Client.scope("public").findOne({
            where:{
                firstName: value.firstName,
                lastName: value.lastName
            }
        }))
        .then(j => {
                result.id = j.id;
                result.firstName = j.firstName;
                result.lastName = j.lastName;
                result.phone = j.phone;
                //console.log(j.toJSON());
                //console.log(result);
            });
        return result;
    }

    Update(value : ClientMdl) {
        var result = new ClientMdl();
        if(value.id > 0 ){
        var _ =_instance.sync()
        .then(() => Client.update({
            firstName: value.firstName,
            lastName: value.lastName,
        },{
            where:{
                id: value.id
            }
        }))
        .then(j => {
                result.id = j.id;
                result.firstName = j.firstName;
                result.lastName = j.lastName;
                result.phone = j.phone;
                //console.log(j.toJSON());
                console.log(result);
            });
        }else{
            console.log("O id da entidade não foi informado! " + value);
        }
        return result;
    }
    Delete(value : ClientMdl) {
        var deleteEntitie = new ClientMdl();

        console.log("Iniciando exclusão da entidade: " + 
            " Id: " + value.id + 
            " FirstName: " + value.firstName + 
            " LastName: " + value.lastName + 
            " Phone: " + value.phone);
          
        if(deleteEntitie.id > 0){
            _instance.sync()
            .then(() => Client.destroy({
                where:{
                    id: deleteEntitie.id
                }
            }))
            .then(j => {
                    console.log(j.toJSON());
                });
        }else{
            console.log("Entidade não encontrada: " + 
            " Id: " + deleteEntitie.id + 
            " FirstName: " + deleteEntitie.firstName + 
            " LastName: " + deleteEntitie.lastName + 
            " Phone: " + deleteEntitie.phone);
        }
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