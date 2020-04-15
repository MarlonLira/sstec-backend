import { Op } from 'sequelize';
import Attributes from "./attributes";

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
  static Like(entity, properties: string[]) {
    const query: any = {};
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
  static Equal(entity, properties: string[]) {
    const query: any = {};
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
  static Or(entity, properties: string[]) {
    const query: any = {};
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

export default Querying;