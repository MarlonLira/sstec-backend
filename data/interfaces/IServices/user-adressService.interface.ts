import { ParkingAdress } from '../../models/parking-adress.model';
import { UserAdress } from '../../models/user-adress.model';

export interface IUserAdressService {
  getById(id: number): Promise<UserAdress>;
  getByUserId(id: number): Promise<UserAdress>;
  save(userAdress: UserAdress): Promise<any>;
  update(userAdress: UserAdress): Promise<any>;
}