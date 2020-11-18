import { Attributes } from "./attributes";
import { Logger } from "./logger";

export class InnerException {

  static decode(obj: object): string {
    let result = JSON.stringify(obj);

    if (Attributes.isValid(result)) {
      result = String(obj);
    }

    return result;
  }

}