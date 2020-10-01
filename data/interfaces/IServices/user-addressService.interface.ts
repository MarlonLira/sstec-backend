import { ParkingAddress } from '../../models/parking-address.model';
import { UserAddress } from '../../models/user-address.model';

export interface IUserAddressService {
  getById(id: number): Promise<UserAddress>;
  getByUserId(id: number): Promise<UserAddress>;
  save(userAddress: UserAddress): Promise<any>;
  update(userAddress: UserAddress): Promise<any>;
}