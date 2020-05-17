import { isNumber, isUndefined, isNull, isArray } from "util";

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
  static IsValid(value: any): boolean {
    if (isArray(value)) {
      return value.length > 0 ? true: false;
    }
    return (!isUndefined(value) && value !== '' && !isNull(value)) ? true : false;
  }

  /**
   * @description
   * @author Marlon Lira
   * @static
   * @param {*} value
   * @param {*} [returnIfNotValid=undefined]
   * @returns {*}
   * @memberof Attributes
   */
  // tslint:disable-next-line: no-unnecessary-initializer
  static ReturnIfValid(value: any, returnIfNotValid: any = undefined): any {
    return this.IsValid(value) ? value : returnIfNotValid;
  }
}

export default Attributes;