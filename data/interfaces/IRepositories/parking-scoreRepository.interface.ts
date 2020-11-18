import { ParkingScore } from '../../models/parking-score.model';

export interface IParkingScoreRepository {
  save(parkingScore: ParkingScore): Promise<any>;
  update(parkingScore: ParkingScore): Promise<any>;
  getByParkingId(_parkingId: number): Promise<ParkingScore[]>;
  getById(id: number): Promise<ParkingScore>;
  delete(id: number): Promise<any>;
}