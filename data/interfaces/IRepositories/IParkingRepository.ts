import Parking from '../../models/parking';

/**
 * @description
 * @author Emerson Souza
 * @interface IParkingRepository
 */
interface IParkingRepository {
  Save(parking: Parking, companyId: number);
  Update(parking: Parking);
  ToList();
  GetById(id: number);
  GetByRegistryCode(registryCode: string);
  Delete(id: number);
  Find(parking: Parking, properties: string[]);
}

export default IParkingRepository;