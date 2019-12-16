import { Sequelize } from 'sequelize';
import { dbConfig } from './config';

var _instance = null;

class DbConnect{

    private port : number;
    private host: string;
    private Schema: string;
    private userName: string;
    private password: string;

    constructor(Schema, userName, password, host, port = 3000){

        this.userName = userName;
        this.password = password;
        this.host = host;
        this.Schema = Schema;
        this.port = port;

    }
    
    getNewInstance(){
        const sequelize = new Sequelize(this.Schema, this.userName,this.password, 
            { 
                port: this.port,
                host: this.host,
                dialect: 'mysql',
                ssl: true
            }
        );

        // sequelize
        // .authenticate()
        // .then(() => {
        //     console.log('Connection has been established successfully. Server: ' + this.host + ':' + this.port + ' - Schema: ' + this.Schema );
        // })
        // .catch(err => {
        // console.error('Unable to connect to the database:', err);
        // });

        return sequelize;
    }
}

class DbInstance {
    getInstance(){
        var db = new dbConfig();
        _instance = new DbConnect(db.schema, db.userName, db.password, db.host, db.port).getNewInstance();
        return _instance;
    }
    getInstance2(){

    }
}

export { DbInstance }