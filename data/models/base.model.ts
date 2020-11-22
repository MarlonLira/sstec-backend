import { Model } from 'sequelize';
import { Context } from '../../main/context';

export const _instance = Context.getInstance();

export class BaseModel {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(json?: any) {
    if (json) {
      this.id = json.id;
      this.createdAt = json.createdAt;
      this.updatedAt = json.updatedAt;
    }
  }
}

export class BaseModelDAO extends Model { }