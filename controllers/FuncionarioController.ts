import IEntitie from '../interfaces/IEntitie';
import { DbInstance } from '../context/DbContext';
import { Op } from 'sequelize';
import { HttpCode } from '../commons/enums/Http';
import { GetHttpMessage } from '../commons/functions/Http';
import { Attributes } from '../commons/Helpers';
import { Funcionario } from '../models/Funcionario';

var _instance = new DbInstance().getInstance();
var _Attributes = new Attributes();


export default class FuncionarioController extends Funcionario implements IEntitie {
    Save(response?: any) {
        throw new Error("Method not implemented.");
    }
    Search(response?: any) {
        throw new Error("Method not implemented.");
    }
    SearchAll(response?: any) {
        throw new Error("Method not implemented.");
    }
    Update(response?: any) {
        throw new Error("Method not implemented.");
    }
    Delete(response?: any) {
        throw new Error("Method not implemented.");
    }
}