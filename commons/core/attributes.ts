export class Attributes {

  public static isValid(value) {
    if (typeof (value) === 'string') {
      return value !== '' ? true : false;
    } else if (Array.isArray(value)) {
      return value.length > 0 ? true : false;
    }
    return !Attributes.isNullOrUndefined(value) ? true : false;
  }

  static returnIfValid = (value, defaultValue = undefined) => Attributes.isValid(value) ? value : defaultValue;
  static isNullOrUndefined = (value: any) => (value === null || value === undefined);

  static encodeImage(value: any) {
    if (value.image) {
      value.image = value.image.toString('base64');
    }
    return value;
  }
}