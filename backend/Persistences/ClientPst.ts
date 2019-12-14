import Client from "../Models/Client";
import IEntitie from "../Models/IEntitie";
import * as Sequelize from 'sequelize';

export default class ClientPst extends Client implements IEntitie{
    constructor(firtName, lastName, phone, Sequelize){
        super(firtName, lastName, phone);
    }
    
    Save() {
        let sequelize = Sequelize;
        // return sequelize.transaction(t => {

        //     // chain all your queries here. make sure you return them.
        //     return Client.create({
        //       firstName: 'Abraham',
        //       lastName: 'Lincoln'
        //     }, {transaction: t}).then(user => {
        //       return user.setShooter({
        //         firstName: 'John',
        //         lastName: 'Boothe'
        //       }, {transaction: t});
        //     });
          
        //   }).then(result => {
        //     // Transaction has been committed
        //     // result is whatever the result of the promise chain returned to the transaction callback
        //   }).catch(err => {
        //     // Transaction has been rolled back
        //     // err is whatever rejected the promise chain returned to the transaction callback
        //   });
        throw new Error("Method not implemented.");
    }
    Search() {
        throw new Error("Method not implemented.");
    }
    Update() {
        throw new Error("Method not implemented.");
    }
    Delete() {
        throw new Error("Method not implemented.");
    }
}