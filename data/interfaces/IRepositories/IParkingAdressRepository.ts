import ParkingAdress from '../../models/parkingAdress';

/**
 * @description
 * @author Felipe Seabra
 * @interface IParkingAdressRepository
 */
interface IParkingAdressRepository {
  Save(parkingAdress: ParkingAdress): Promise <any>;
  Update(parkingAdress: ParkingAdress): Promise <any>;
  GetById(id: number): Promise <ParkingAdress>;
  Delete(id: number): Promise <any>;
  ToList(_parkingId): Promise <ParkingAdress[]>
}

export default IParkingAdressRepository;