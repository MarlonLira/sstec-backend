//const Sequelize = require('sequelize');
import * as Sequelize from 'sequelize';

export class DbConnect{
    port : string;
    host: string;
    db: string;
    userName: string;
    password: string;
    constructor(db, userName, password, host){
        this.db = db;
        this.userName = userName;
        this.password = password;
        this.host = host;

        const sequelize = new Sequelize.Sequelize(this.db, this.userName,this.password, 
            { 
                host: this.host,
                dialect: 'mysql'
            }
        );
        
        sequelize
        .authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
        })
        .catch(err => {
        console.error('Unable to connect to the database:', err);
        });
    }

    Create(entitie){
        entitie.Save();
    }

    Delete(entitie){
        entitie.Delete();
    }
}