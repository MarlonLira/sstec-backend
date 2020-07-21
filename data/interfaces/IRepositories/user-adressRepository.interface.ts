import UserAdress from '../../models/user-adress.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @interface IUserAdressRepository
 */
interface IUserAdressRepository {
  Save(userAdress: UserAdress): Promise<any>;
  GetByUserId(_userId: number): Promise<UserAdress[]>;
  Update(userAdress: UserAdress): Promise<any>;
  Delete(_id: number): Promise<any>;
}

export default IUserAdressRepository;