import { Op } from 'sequelize';
var bcrypt = require('bcrypt');

/**
 * @description
 * @author Marlon Lira
 * @class Helpers
 */
class Helpers {

}

/**
 * @description
 * @author Marlon Lira
 * @class Querying
 */
class Querying {

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {Array<string>} properties
   * @returns 
   * @memberof Querying
   */
  static ReturnLikeQuery(entity, properties: Array<string>) {
    let query: any = {};
    properties.forEach(property => {
      if (Attributes.IsValid(entity[property])) {
        query[property] = {
          [Op.like]: `${entity[property]}%`
        };
      }
    });
    return query;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {Array<string>} properties
   * @returns 
   * @memberof Querying
   */
  static ReturnEqualQuery(entity, properties: Array<string>) {
    let query: any = {};
    properties.forEach(property => {
      if (Attributes.IsValid(entity[property])) {
        query[property] = {
          [Op.eq]: entity[property]
        };
      }
    });
    return query;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} entity
   * @param {Array<string>} properties
   * @returns 
   * @memberof Querying
   */
  static ReturnOrQuery(entity, properties: Array<string>) {
    let query: any = {};
    properties.forEach(property => {
      if (Attributes.IsValid(entity[property])) {
        query[property] = {
          [Op.eq]: entity[property]
        };
      }
    });
    return { [Op.or]: query };
  }
}

/**
 * @description
 * @author Marlon Lira
 * @class Attributes
 */
class Attributes {

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} value
   * @returns 
   * @memberof Attributes
   */
  static IsValid(value: any) {
    return (value != undefined && value != '' && value != null) ? true : false;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} value
   * @param {*} [returnIfNotValid=undefined]
   * @returns 
   * @memberof Attributes
   */
  static ReturnIfValid(value: any, returnIfNotValid: any = undefined) {
    return (value != undefined && value != '' && value != null) ? value : returnIfNotValid;
  }
}

/**
 * @description
 * @author Marlon Lira
 * @class InnerJson
 */
class InnerJson {

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} json
   * @param {string[]} requiredAttributes
   * @returns 
   * @memberof InnerJson
   */
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

/**
 * @description
 * @author Marlon Lira
 * @class Crypto
 */
class Crypto {
  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {string} password
   * @returns 
   * @memberof Crypto
   */
  static Encrypt(password: string) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {string} password
   * @param {string} hash
   * @returns 
   * @memberof Crypto
   */
  static Compare(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}

export { Helpers, Attributes, InnerJson, Querying, Crypto }