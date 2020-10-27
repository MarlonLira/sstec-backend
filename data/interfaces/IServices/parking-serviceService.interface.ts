import { ParkingService } from '../../models/parking-service.model';

/**
 * @description
 * @author Gustavo Gusmão
 * @export
 * @interface IParkingServiceService
 */
export interface IParkingServiceService {

  save(parkingService: ParkingService): Promise<any>;
  update(parkingService: ParkingService): Promise<any>;
  toList(parkingId: number): Promise<ParkingService[]>;
  getById(id: number): Promise<ParkingService>;
  getByParkinkId(id: number): Promise<ParkingService[]>;
  delete(id: number): Promise<any>;

}