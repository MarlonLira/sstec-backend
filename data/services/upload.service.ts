import { injectable, inject } from "inversify";
import { IUploadService } from "../interfaces/IServices/uploadService.interface";
import { IncomingForm } from 'formidable';
import * as fs from 'fs';
import * as Config from '../../config.json';
import { ParkingFile } from "../models/parking-file.model";
import TYPES from "../types";
import { IParkingFileRepository } from "../interfaces/IRepositories/parkingFileRepository.interface";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";

const { PathDir } = Config.Upload;

@injectable()
class UploadService implements IUploadService {
  private form: IncomingForm;

  constructor(
    @inject(TYPES.IParkingFileRepository) private pFileRepository: IParkingFileRepository,
    @inject(TYPES.ILogService) private log: ILogService) {
    this.form = new IncomingForm();
    this.form.uploadDir = PathDir;
    this.form.keepExtensions = true;
  }

  toListByParkingId(parkingId: number): Promise<ParkingFile[]> {
     return new Promise((resolve, reject) => {
      this.pFileRepository.toList(parkingId)
        .then((result: ParkingFile[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Upload', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error))));
    });
  }

  saveParkingFile(req: any, res: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const parkingFile = new ParkingFile();

      this.form.parse(req);

      this.form.on('fileBegin', (id, file) => {
        const dir = `${PathDir}/${id}`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        file.path = `${dir}/${file.name}`;
      });

      this.form.on('file', (id, file) => {
        parkingFile.parkingId = Number(id);
        parkingFile.path = file.path;
        parkingFile.name = file.name;
        const readStream = fs.createReadStream(file.path);
      });

      this.form.on('end', () => {
        this.pFileRepository.save(parkingFile)
          .then(result => resolve(result))
          .catch(async error => {
            reject(await this.log.critical('Upload', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, JSON.stringify(error)))
          });
      });
    });
  }

}

export default UploadService;