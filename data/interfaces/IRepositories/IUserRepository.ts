import User from '../../models/user';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IUserRepository
 */
interface IUserRepository {
  GetByName(userName: string): Promise<User[]>;
  GetByRegistryCode(registryCode: string): Promise<User[]>;
  GetById(id: number): Promise<User>;
  ToList(): Promise<User[]>;
  Save(user: User): Promise<any>;
  Update(user: User): Promise<any>;
}

export default IUserRepository;