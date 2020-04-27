import ParkingFinance from '../../models/parkingFinance';


/**
 * @description
 * @author Felipe Seabra
 * @interface IParkingFinanceRepository
 */
interface IParkingFinanceRepository{
Save(parkingFinance: ParkingFinance);
Update(parkingFinance: ParkingFinance);
getById(id: number);
ToList();
}
export default IParkingFinanceRepository;