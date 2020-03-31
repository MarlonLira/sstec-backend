import { User } from '../models/User';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IUserRepository
 */
export default interface IUserRepository {
  GetByName(userName: string);
  GetByRegistryCode(registryCode: string);
  ToList();
  Save(user : User);
  Find(user: User, properties: string[]);
}