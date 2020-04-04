import { Attributes } from './helpers';

/**
 * @description
 * @author Marlon Lira
 * @class InnerDate
 */
class InnerDate {
  public Day!: string;
  public Month!: string;
  public Year!: string;
  public FullDate!: string;
  public _isValidDate!: boolean;

  /**
   *Creates an instance of InnerDate.
   * @author Marlon Lira
   * @param {*} [fullDate]
   * @memberof InnerDate
   */
  public constructor(fullDate?: any) {
    this._isValidDate = true;
    let datePart = Attributes.IsValid(fullDate) ? fullDate.split('-') : undefined;

    if (Attributes.IsValid(datePart)) {
      this.Year = LeftZero(datePart[0]);
      this.Month = LeftZero(datePart[1]);
      this.Day = LeftZero(datePart[2]);
      this.FullDate = fullDate;
    } else {
      this._isValidDate = false;
    }
  }

  /**
   * @description returns the built date in the constructor
   * @author Marlon Lira
   * @returns 
   * @memberof InnerDate
   */
  getFullDate() {
    return this._isValidDate ? `${this.Year}-${this.Month}-${this.Day}` : undefined;
  }

  /**
   * @description Loads the entity with the current date
   * @author Marlon Lira
   * @returns 
   * @memberof InnerDate
   */
  public Now() {
    let _date = new Date();
    this.Year = LeftZero(_date.getFullYear());
    this.Month = LeftZero(_date.getMonth() + 1);
    this.Day = LeftZero(_date.getDay());
    this.FullDate = `${this.Year}-${this.Month}-${this.Day}`;
    return `${this.Year}-${this.Month}-${this.Day}`;
  }
}

/**
 * @description
 * @author Marlon Lira
 * @returns Current date
 */
function DateNow() {
  var _date = new Date();
  var Year = LeftZero(_date.getFullYear());
  var Month = LeftZero(_date.getMonth() + 1);
  var Day = LeftZero(_date.getDay());
  return `${Year}-${Month}-${Day}`;
}

/**
 * @description
 * @author Marlon Lira
 * @returns Current date with time
 */
function DateTimeNow() {
  var _date = new Date();
  var Year = LeftZero(_date.getFullYear());
  var Month = LeftZero(_date.getMonth() + 1);
  var Day = LeftZero(_date.getDay());
  var hours = _date.getUTCHours() - 3;
  var minutes = _date.getUTCMinutes();
  var seconds = _date.getUTCSeconds();
  var build = `${Year}-${Month}-${Day} ${hours}:${minutes}:${seconds}`;
  return build;
}

/**
 * @description
 * @author Marlon Lira
 * @param {*} value
 * @returns 
 */
function LeftZero(value: any) {
  let result: string = ' ';
  if (value != undefined && value != null) {
    result = value.toString();
    if (value.toString().length == 1) {
      result = `0${value.toString()}`;
    }
  }
  return result;
}

export { InnerDate, DateNow, DateTimeNow };