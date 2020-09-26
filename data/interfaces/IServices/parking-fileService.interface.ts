import { ParkingFile } from "../../models/parking-file.model";

export interface IParkingFileService {
  save(parkingFile: ParkingFile): Promise<any>;
  getByParkingId(parkingId: number): Promise<ParkingFile[]>
  delete(id: Number): Promise<any>;
}