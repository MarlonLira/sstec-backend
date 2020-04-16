import ParkingAdress from '../../models/parkingAdress';

/**
 * @description
 * @author Felipe Seabra
 * @interface IParkingAdressRepository
 */
interface IParkingAdressRepository {
  Save(parkingAdress: ParkingAdress);
  Update(parkingAdress: ParkingAdress);
  GetById(id: number);
  Delete(id: number);
  ToList();
}

export default IParkingAdressRepository;