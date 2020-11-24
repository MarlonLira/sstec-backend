import { ParkingScore } from '../../models/parking-score.model';

export interface IParkingScoreService {
  save(item: ParkingScore): Promise<any>;
  update(item: ParkingScore): Promise<any>;
  delete(id: number): Promise<any>;
  getById(id: number): Promise<ParkingScore>;
  getByParkingId(id: number): Promise<ParkingScore[]>;
}