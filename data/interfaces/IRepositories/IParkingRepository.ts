import Parking from '../../models/parking';
import User from '../../models/user';
import Card from '../../models/card';


/**
 * @description
 * @author Emerson Souza
 * @interface IParkingRepository
 */
interface IParkingRepository {
  Save(parking: Parking, companyId: number);
  Update(parking: Parking);
  ToList();
  GetByRegistryCode(registryCode: string);
  Delete(id: number);
  Find(parking: Parking, properties: string[]);
}

export default IParkingRepository;