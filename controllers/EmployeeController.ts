import IEntitie from '../interfaces/IEntitie';
import { Employee } from '../models/Employee';

export default class EmployeeController extends Employee implements IEntitie {
    Save(response?: any) {
        throw new Error("Method not implemented.");
    }    
    Search(response?: any, isAll?: boolean) {
        throw new Error("Method not implemented.");
    }
    Update(response?: any) {
        throw new Error("Method not implemented.");
    }
    Delete(response?: any) {
        throw new Error("Method not implemented.");
    }
}