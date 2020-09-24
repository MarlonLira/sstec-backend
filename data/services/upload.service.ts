import { injectable, inject } from "inversify";
import { IUploadService } from "../interfaces/IServices/uploadService.interface";
import { IncomingForm } from 'formidable';
import * as fs from 'fs';
import * as Config from '../../config.json';
import { ParkingFile } from "../models/parking-file.model";
import TYPES from "../types";
import { InnerException } from "../../commons/core/innerException";
import { IParkingFileRepository } from "../interfaces/IRepositories/parkingFileRepository.interface";
import { ILogService } from "../interfaces/IServices/logService.interface";
import { HttpCode } from "../../commons/enums/httpCode";
import { HttpMessage } from "../../commons/enums/httpMessage";

const { PathDir } = Config.Upload;

@injectable()
export class UploadService implements IUploadService {
  private form: IncomingForm;

  constructor(
    @inject(TYPES.IParkingFileRepository) private pFileRepository: IParkingFileRepository,
    @inject(TYPES.ILogService) private log: ILogService) {
    this.form = new IncomingForm();
    this.form.uploadDir = `${__dirname}/${PathDir}`;
    this.form.keepExtensions = true;
    this.createFolderIfNotExists(this.form.uploadDir);
  }

  save(req: any, folderName: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let filePath = '';
        this.form.uploadDir += folderName;

        this.form.parse(req);
        this.createFolderIfNotExists(this.form.uploadDir);
        this.form.on('fileBegin', (id, file) => {
          this.form.uploadDir += `/${id}`;
          this.createFolderIfNotExists(this.form.uploadDir);
          file.path = `${this.form.uploadDir}/${file.name}`;
        });

        this.form.on('file', (id, file) => {
          filePath = file.path;
          const readStream = fs.createReadStream(file.path);
        });

        this.form.on('end', () => {
          resolve(filePath);
        });
      } catch (error) {
        reject(await this.log.critical('Upload', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)))
      }
    });
  }

  toListByParkingId(parkingId: number): Promise<ParkingFile[]> {
    return new Promise((resolve, reject) => {
      this.pFileRepository.toList(parkingId)
        .then((result: ParkingFile[]) => resolve(result))
        .catch(async (error: any) =>
          reject(await this.log.critical('Upload', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error))));
    });
  }

  saveParkingFile(req: any, res: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const parkingFile = new ParkingFile();
      const parkingPath = `${this.form.uploadDir}/parking`;

      this.form.parse(req);
      this.createFolderIfNotExists(parkingPath);
      this.form.on('fileBegin', (id, file) => {
        const dir = `${parkingPath}/${id}`;
        this.createFolderIfNotExists(dir);
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
            reject(await this.log.critical('Upload', HttpCode.Internal_Server_Error, HttpMessage.Unknown_Error, InnerException.decode(error)))
          });
      });
    });
  }

  private createFolderIfNotExists(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

}
