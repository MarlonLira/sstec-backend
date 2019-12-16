import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
//const sequelize = new Sequelize('mysql://root:asd123@localhost:3306/mydb');
import * as dbConnect from '../db';

export default class Client extends Model{
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public phone!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
    sequelize: new dbConnect.default('sstec', 'sa', 'Root1526', './sqlexpress').getInstance(),
    tableName: 'Client'
});

// sequelize.sync()
//   .then(() => Client.create({
//     firstName: 'janedoe',
//     lastName: 'janedoe',
//     phone: '81986465525'
//   }))
//   .then(j => {
//     console.log(j.toJSON());
//   });