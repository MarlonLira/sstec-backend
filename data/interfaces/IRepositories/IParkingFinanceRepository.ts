import ParkingFinance from '../../models/parkingFinance';


/**
 * @description
 * @author Felipe Seabra
 * @interface IParkingFinanceRepository
 */
interface IParkingFinanceRepository{
Save(parkingFinance: ParkingFinance): Promise<any>;
Update(parkingFinance: ParkingFinance): Promise <any>;
GetById(id: number): Promise <ParkingFinance>;
ToList(_parkingId): Promise <ParkingFinance[]>;
Delete(id: number): Promise<any>;
}
export default IParkingFinanceRepository;