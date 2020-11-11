import  ParkingFinance  from '../../models/parking-finance.model';

export interface IParkingFinanceService {

  save(parkingFinance: ParkingFinance): Promise<any>;

  update(parkingFinance: ParkingFinance): Promise<any>;

  delete(id: number): Promise<any>;

  getById(id: number): Promise<ParkingFinance>;

  toList(_parkingId: number): Promise<ParkingFinance[]>;
}