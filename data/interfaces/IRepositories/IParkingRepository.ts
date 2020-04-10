import Parking from '../../models/parking';
import User from '../../models/user';
import Card from '../../models/card';


/**
 * @description
 * @author Emerson Souza
 * @interface IParkingRepository
 */
interface IParkingRepository {
  Save(parking: Parking);
  Update(parking: Parking);
  GetByRegistryCode(registryCode: string);
  Delete(id: number);
}

export default IParkingRepository;