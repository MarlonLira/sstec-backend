import ParkingFinance from '../../models/parking-finance.model';

interface IParkingFinanceRepository{
save(parkingFinance: ParkingFinance): Promise<any>;
update(parkingFinance: ParkingFinance): Promise <any>;
getById(id: number): Promise <ParkingFinance>;
toList(_parkingId): Promise <ParkingFinance[]>;
delete(id: number): Promise<any>;
}
export default IParkingFinanceRepository;