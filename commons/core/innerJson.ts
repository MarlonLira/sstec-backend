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
    if (json !== undefined && json !== '' && json != null) {
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

export default InnerJson;