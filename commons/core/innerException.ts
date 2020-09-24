import Attributes from "./attributes";

export class InnerException {

  static decode(obj: object): string {
    let result = JSON.stringify(obj);

    if (Attributes.IsValid(result)) {
      result = String(obj);
    }

    return result;
  }

}