export class Attributes {

  public static isValid(value, isObject = false) {
    const _isNullOrUndefined = Attributes.isNullOrUndefined(value);
    if (!_isNullOrUndefined) {

      if (isObject) {
        return !Attributes.objectIsEmpty(value);
      } else {
        if (typeof (value) === 'string') {
          return value !== '' ? true : false;
        } else if (Array.isArray(value)) {
          return value.length > 0 ? true : false;
        }
      }
    }
    return !_isNullOrUndefined;
  }

  static objectIsEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
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