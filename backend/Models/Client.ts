import IEntitie from './IEntitie';
import MdlBase from './MdlBase';

export default class Client extends MdlBase{
    firstName: string;
    lastName: string;
    phone: string;

    constructor(firtName, lastName, phone){
        super();
        this.firstName = firtName;
        this.lastName = lastName;
        this.phone = phone;
    }
}