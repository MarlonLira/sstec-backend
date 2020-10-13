import { UserAdress } from '../../models/user-adress.model';

export interface IUserAdressRepository {
  save(userAdress: UserAdress): Promise<any>;
  getByUserId(userId: number): Promise<UserAdress>;
  getById(id: number): Promise<UserAdress>;
  update(userAdress: UserAdress): Promise<any>;
  delete(id: number): Promise<any>;
}