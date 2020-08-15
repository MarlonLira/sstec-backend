export interface IUploadService {
  /**
   * @description
   * @author Marlon Lira
   * @param {File} file
   * @returns {Promise<any>}
   * @memberof IUploadService
   */
  saveParkingFile(req: any, res: any): Promise<any>;
}