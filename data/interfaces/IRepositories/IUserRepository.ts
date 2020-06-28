import User from '../../models/user';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @interface IUserRepository
 */
interface IUserRepository {

  /**
   * @description
   * @author Marlon Lira
   * @param {string} name
   * @returns {Promise<User[]>}
   * @memberof IUserRepository
   */
  GetByName(name: string): Promise<User[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} registryCode
   * @returns {Promise<User[]>}
   * @memberof IUserRepository
   */
  GetByRegistryCode(registryCode: string): Promise<User[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {string} _email
   * @returns {Promise<User>}
   * @memberof IUserRepository
   */
  GetByEmail(_email: string): Promise<User>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} id
   * @returns {Promise<User>}
   * @memberof IUserRepository
   */
  GetById(_id: number): Promise<User>;

  /**
   * @description
   * @author Marlon Lira
   * @returns {Promise<User[]>}
   * @memberof IUserRepository
   */
  ToList(): Promise<User[]>;

  /**
   * @description
   * @author Marlon Lira
   * @param {User} user
   * @returns {Promise<any>}
   * @memberof IUserRepository
   */
  Save(user: User): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {User} user
   * @returns {Promise<any>}
   * @memberof IUserRepository
   */
  Update(user: User): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} _id
   * @returns {Promise<any>}
   * @memberof IUserRepository
   */
  Delete(_id: number): Promise<any>;
}

export default IUserRepository;