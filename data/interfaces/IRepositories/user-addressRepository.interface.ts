import { UserAddress } from '../../models/user-address.model';

export interface IUserAddressRepository {
  save(userAddress: UserAddress): Promise<any>;
  getByUserId(userId: number): Promise<UserAddress>;
  getById(id: number): Promise<UserAddress>;
  update(userAddress: UserAddress): Promise<any>;
  delete(id: number): Promise<any>;
}