import User from '../../models/user';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IUserRepository
 */
interface IUserRepository {
  GetByName(userName: string);
  GetByRegistryCode(registryCode: string);
  GetById(id: number);
  ToList();
  Save(user: User);
  Find(user: User, properties: string[]);
}

export default IUserRepository;