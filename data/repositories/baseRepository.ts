import IRepository from '../interfaces/IRepository';

/**
 * @description
 * @author Marlon Lira
 * @export
 * @class BaseRepository
 * @implements {IRepository}
 */
export default class BaseRepository implements IRepository {
  GetById(id: number) {
    throw new Error("Method not implemented.");
  }
  ToList() {
    throw new Error("Method not implemented.");
  }
  ToDictionary() {
    throw new Error("Method not implemented.");
  }
  Save(entity: any) {
    throw new Error("Method not implemented.");
  }
  Update(entity: any) {
    throw new Error("Method not implemented.");
  }

}