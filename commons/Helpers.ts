import { Op } from 'sequelize';

class Helpers {

}

class Querying {
  static ReturnLikeQuery(entitie, properties: Array<string>) {
    let query: any = {};
    properties.forEach(propertie =>{
      if(Attributes.IsValid(entitie[propertie])){
        query[propertie] = {
          [Op.like]: `${entitie[propertie]}%`
        };
      }
    });
    console.log(query)
    return query;
  }
  static ReturnEqualQuery(entitie, properties: Array<string>) {
    let query: any = {};
    properties.forEach(propertie =>{
      if(Attributes.IsValid(entitie[propertie])){
        query[propertie] = {
          [Op.eq]: entitie[propertie]
        };
      }
    });
    console.log(query)
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

export { Helpers, Attributes, InnerJson, Querying }