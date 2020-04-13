import Parking from '../../models/parking';
import ParkingSpace from '../../models/parkingSpace';



interface IParkingSpaceRepository {
  Save(parkingSpace: Parking, parking: number);
  Update(parkingSpace: Parking);
  ToList();
  GetByRegistryCode(registryCode: string);
  Delete(id: number);
  Find(parkingSpace: Parking, properties: string[]);
}

export default IParkingSpaceRepository;