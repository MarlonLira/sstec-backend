import * as Sequelize from 'sequelize'
import * as Db from '../db';

const sequelize = new Db.DbInstance().getInstance();
export interface ClientAddModel {
    firstName: string;
    lastName: string;
    phone: string;
}

export interface ClientModel extends Sequelize.Model<ClientModel, ClientAddModel> {
    id: number
    firstName: string;
    lastName: string;
    phone: string;
    createdAt: string
    updatedAt: string
}

export interface UserViewModel {
    id: number
    createdAt: string
    updatedAt: string
}
export const User = sequelize.define('Client', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: new Sequelize.STRING(128),
        allowNull: false,
    },
    lastName: {
        type: new Sequelize.STRING(128),
        allowNull: false,
    },
    phone: {
        type: new Sequelize.STRING(12),
        allowNull: false,
    }
})
