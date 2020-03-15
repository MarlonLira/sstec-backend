import { Op } from 'sequelize';
var bcrypt = require('bcrypt');

class Helpers {

}

class Querying {
  static ReturnLikeQuery(entitie, properties: Array<string>) {
    let query: any = {};
    properties.forEach(propertie => {
      if (Attributes.IsValid(entitie[propertie])) {
        query[propertie] = {
          [Op.like]: `${entitie[propertie]}%`
        };
      }
    });
    return query;
  }
  static ReturnEqualQuery(entitie, properties: Array<string>) {
    let query: any = {};
    properties.forEach(propertie => {
      if (Attributes.IsValid(entitie[propertie])) {
        query[propertie] = {
          [Op.eq]: entitie[propertie]
        };
      }
    });
    return query;
  }
}

class Attributes {

  static IsValid(value: any) {
    return (value != undefined && value != '' && value != null) ? true : false;
  }

  static ReturnIfValid(value: any, returnIfNotValid: any = undefined) {
    return (value != undefined && value != '' && value != null) ? value : returnIfNotValid;
  }


}

class InnerJson {
  static IsValid(json: any, requiredAttributes: string[]) {
    let result = false;
    let count = 0;
    if (json != undefined && json != '' && json != null) {
      result = true;
    }
    requiredAttributes.forEach(element => {
      if (json.hasOwnProperty(element)) {
        result = true;
        count++;
      }
    });
    if (count <= 0) result = false;

    return result;
  }
}

class Crypto {
  static Encrypt(password: string) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static Compare(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

export { Helpers, Attributes, InnerJson, Querying, Crypto }