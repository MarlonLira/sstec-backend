import { Model } from 'sequelize';
import { Context } from '../../main/context';

export const _instance = Context.getInstance();

export class BaseModel extends Model {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(json?: any) {
    super();
    if (json) {
      this.id = json.id;
      this.createdAt = json.createdAt;
      this.updatedAt = json.updatedAt;
    }
  }
}