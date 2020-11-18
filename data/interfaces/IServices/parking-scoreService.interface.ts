import { ParkingScore } from '../../models/parking-score.model';

export interface IParkingScoreService {
  save(parkingScore: ParkingScore): Promise<any>;
  update(parkingScore: ParkingScore): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<ParkingScore>;
  getByParkingId(parkingId: number): Promise<ParkingScore[]>;
}