import { ParkingFile } from "../../models/parking-file.model";

export interface IUploadService {
  /**
   * @description
   * @author Marlon Lira
   * @param {File} file
   * @returns {Promise<any>}
   * @memberof IUploadService
   */
  saveParkingFile(req: any, res: any): Promise<any>;

  save(parkingFile: ParkingFile): Promise<any>;

  /**
   * @description
   * @author Marlon Lira
   * @param {number} parkingId
   * @returns {Promise<ParkingFile[]>}
   * @memberof IUploadService
   */
  toListByParkingId(parkingId: number): Promise<ParkingFile[]>
}