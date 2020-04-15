import ParkingAdress from '../../models/parkingAdress';

/**
 * @description
 * @author Felipe Seabra
 * @interface IParkingAdressRepository
 */
interface IParkingAdressRepository {
  Save(parkingAdress: ParkingAdress, parkingId: number);
  Update(parkingAdress: ParkingAdress);
  GetById(id: number);
  Delete(id: number);
}

export default IParkingAdressRepository;