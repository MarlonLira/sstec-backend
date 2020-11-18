import { DataTypes } from 'sequelize';
import { Attributes } from '../../commons/core/attributes';
import { TransactionType } from '../../commons/enums/transactionType';
import { UserAddress } from './user-address.model';
import { Vehicle } from './vehicle.model';
import { Card } from './card.model';
import { FavoriteParking } from './favorite-parking.model';
import { BaseModel, _instance } from './base.model';

export class User extends BaseModel {

  id!: number;
  status!: TransactionType;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  password!: string;
  image!: any;

  address: UserAddress;
  vehicles: Vehicle[];
  cards: Card[];
  favoriteParkings: FavoriteParking[];

  constructor(json?: any) {
    super(json);
    if (json) {
      this.id = Attributes.returnIfValid(json.id);
      this.name = Attributes.returnIfValid(json.name);
      this.status = Attributes.returnIfValid(json.status);
      this.registryCode = Attributes.returnIfValid(json.registryCode);
      this.phone = Attributes.returnIfValid(json.phone);
      this.email = Attributes.returnIfValid(json.email);
      this.password = Attributes.returnIfValid(json.password);
      this.image = Attributes.returnIfValid(json.image);
    }
  }

  ToAny() {
    const obj: any = this.toJSON();
    obj.address = this.address;
    obj.vehicles = this.vehicles;
    obj.cards = this.cards;
    obj.favoriteParkings = this.favoriteParkings;
    return;
  }
}

User.init({
  id: {
    type: new DataTypes.INTEGER(),
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: new DataTypes.STRING(2),
    allowNull: false
  },
  name: {
    type: new DataTypes.STRING(30),
    allowNull: false
  },
  registryCode: {
    type: new DataTypes.STRING(12),
    allowNull: false
  },
  phone: {
    type: new DataTypes.STRING(12)
  },
  email: {
    type: new DataTypes.STRING(50),
    validate: { isEmail: true }
  },
  password: {
    type: new DataTypes.STRING(100)
  },
  image: {
    type: new DataTypes.BLOB("medium"),
    get() {
      return this.getDataValue('image') ? this.getDataValue('image').toString('base64') : undefined;
    }
  }
}, {
  sequelize: _instance,
  tableName: 'User'
});