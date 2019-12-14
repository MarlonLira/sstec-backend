//const Sequelize = require('sequelize');
import * as Sequelize from 'sequelize';
import { DataType } from 'sequelize';

export default class DbConnect{
    private _instance;

    public port : string;
    public host: string;
    public db: string;
    public userName: string;
    public password: string;
    constructor(db, userName, password, host){
        this.db = db;
        this.userName = userName;
        this.password = password;
        this.host = host;

        // const sequelize = new Sequelize.Sequelize(this.db, this.userName,this.password, 
        //     { 
        //         host: this.host,
        //         dialect: 'mysql'
        //     }
        // );

        // const sequelize = new Sequelize.Sequelize(this.db, this.userName,this.password, 
        //     { 
        //         host: this.host,
        //         dialect: 'mssql'
        //     }
        // );

        // const sequelize = new Sequelize.Sequelize('postgres://nlftzsubppeyav:259cf8d446022dc1743ab5ee5727a7e969d6b6e38e8826dddb5c1c0a09dae068@ec2-107-21-110-75.compute-1.amazonaws.com:5432/d8crqilshjdjcp',
        // {
        //     ssl: true,
        //     dialect: 'postgres'
        // });

         const sequelize = new Sequelize.Sequelize(this.db, this.userName,this.password, 
            { 
                port: 5432,
                host: this.host,
                dialect: 'postgres',
                ssl: true,
                
            }
        );
        
        sequelize
        .authenticate()
        .then(() => {
            this._instance = sequelize;
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
        console.error('Unable to connect to the database:', err);
        });
    }
    
    getInstance(){
        // const sequelize = new Sequelize.Sequelize(this.db, this.userName,this.password, 
        //     { 
        //         host: this.host,
        //         dialect: 'mssql',
        //         dialectOptions: {
        //             instanceName: 'SQLEXPRESS'
        //         }
        //     }
        // );
        const sequelize = new Sequelize.Sequelize(this.db, this.userName,this.password, 
            { 
                host: this.host,
                dialect: 'postgres',
                ssl: true
            }
        );
        return this._instance == null ?  sequelize : this._instance;
    }
    // Create(entitie){
    //     entitie.Save();
    // }

    // Delete(entitie){
    //     entitie.Delete();
    // }
}