import { Attributes } from './attributes';

/**
 * @description
 * @author Marlon Lira
 * @class InnerDate
 */
class InnerDate {
  public day!: string;
  public month!: string;
  public year!: string;
  public hours!: string;
  public minutes!: string;
  public seconds!: string;
  public shortDate!: string;
  public fullDate!: string;
  public _isValidDate!: boolean;

  /**
   * Creates an instance of InnerDate.
   * @author Marlon Lira
   * @param {*} [fullDate]
   * @memberof InnerDate
   */
  ConvertToString(fullDate?: string) {
    this._isValidDate = true;
    const datePart = Attributes.isValid(fullDate) ? fullDate.split('-') : undefined;

    if (Attributes.isValid(datePart)) {
      this.year = LeftZero(datePart[0]);
      this.month = LeftZero(datePart[1]);
      this.day = LeftZero(datePart[2]);
      this.fullDate = fullDate;
    } else {
      this._isValidDate = false;
    }
  }

  ConvertToDateTime(_date: Date): InnerDate {
    this.year = LeftZero(_date.getFullYear());
    this.month = LeftZero(_date.getMonth() + 1);
    this.day = LeftZero(_date.getDate());
    this.hours = LeftZero((_date.getUTCHours() === 1 || _date.getUTCHours() === 2) ? 24 - (3 - _date.getUTCHours()) : _date.getUTCHours() - 3);
    this.minutes = LeftZero(_date.getUTCMinutes());
    this.seconds = LeftZero(_date.getUTCSeconds());
    this.fullDate = `${this.year}-${this.month}-${this.day} ${this.hours}:${this.minutes}:${this.seconds}`;
    this.shortDate = `${this.year}-${this.month}-${this.day}`;
    return (this);
  }
  /**
   * @description returns the built date in the constructor
   * @author Marlon Lira
   * @returns
   * @memberof InnerDate
   */
  getFullDate() {
    return this._isValidDate ? `${this.year}-${this.month}-${this.day}` : undefined;
  }

  /**
   * @description Loads the entity with the current date
   * @author Marlon Lira
   * @returns
   * @memberof InnerDate
   */
  public Now() {
    const _date = new Date();
    this.year = LeftZero(_date.getFullYear());
    this.month = LeftZero(_date.getMonth() + 1);
    this.day = LeftZero(_date.getDay());
    this.fullDate = `${this.year}-${this.month}-${this.day}`;
    return `${this.year}-${this.month}-${this.day}`;
  }
}

/**
 * @description
 * @author Marlon Lira
 * @returns Current date
 */
function DateNow() {
  const _date = new Date();
  const Year = LeftZero(_date.getFullYear());
  const Month = LeftZero(_date.getMonth() + 1);
  const Day = LeftZero(_date.getDay());
  return `${Year}-${Month}-${Day}`;
}

/**
 * @description
 * @author Marlon Lira
 * @returns Current date with time
 */
function DateTimeNow() {
  const _date = new Date();

  const day = _date.getDate();           // 1-31
  const month = _date.getMonth();          // 0-11 (zero=janeiro)
  const year = _date.getFullYear();       // 4 dígitos
  const hours = _date.getHours();          // 0-23
  const minutes = _date.getMinutes();        // 0-59
  const seconds = _date.getSeconds();        // 0-59

  const fullDate = `${year}-${LeftZero((month + 1))}-${LeftZero(day)}`;
  const fullHour = `${LeftZero(hours)}:${LeftZero(minutes)}:${LeftZero(seconds)}`;

  return `${fullDate} ${fullHour}`;
}

/**
 * @description
 * @author Gustavo Gusmão
 * @param {Date} _date
 * @returns {string}
 */
function ConvertToDateTime(_date: Date): string {
  const Year = LeftZero(_date.getFullYear());
  const Month = LeftZero(_date.getMonth() + 1);
  const Day = LeftZero(_date.getDate());
  const hours = LeftZero((_date.getUTCHours() === 1 || _date.getUTCHours() === 2) ? 24 - (3 - _date.getUTCHours()) : _date.getUTCHours() - 3);
  const minutes = LeftZero(_date.getUTCMinutes());
  const seconds = LeftZero(_date.getUTCSeconds());
  const build = `${Year}-${Month}-${Day} ${hours}:${minutes}:${seconds}`;
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
  if (value !== undefined && value != null) {
    result = value.toString();
    if (value.toString().length === 1) {
      result = `0${value.toString()}`;
    }
  }
  return result;
}

export { InnerDate, DateNow, DateTimeNow, ConvertToDateTime };