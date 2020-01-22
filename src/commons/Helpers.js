"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
}
exports.Helpers = Helpers;
class Attributes {
    static IsValid(value) {
        return (value != undefined && value != '' && value != null) ? true : false;
    }
    static ReturnIfValid(value, returnIfNotValid = undefined) {
        return (value != undefined && value != '' && value != null) ? value : returnIfNotValid;
    }
}
exports.Attributes = Attributes;
class InnerJson {
    static IsValid(json, requiredAttributes) {
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
        if (count <= 0)
            result = false;
        return result;
    }
}
exports.InnerJson = InnerJson;
//# sourceMappingURL=Helpers.js.map