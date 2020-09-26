import { ParkingFile } from "../../models/parking-file.model";

export interface IParkingFileRepository {
  toList(parkingId: number): Promise<ParkingFile[]>;
  getById(id: number): Promise<ParkingFile>;
  save(file: ParkingFile): Promise<any>;
  delete(id: number): Promise<any>;
}