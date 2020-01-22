"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Helpers {
}
exports.Helpers = Helpers;
class Querying {
    static ReturnLikeQuery(entitie, properties) {
        let query = {};
        properties.forEach(propertie => {
            if (Attributes.IsValid(entitie[propertie])) {
                query[propertie] = {
                    [sequelize_1.Op.like]: `${entitie[propertie]}%`
                };
            }
        });
        console.log(query);
        return query;
    }
    static ReturnEqualQuery(entitie, properties) {
        let query = {};
        properties.forEach(propertie => {
            if (Attributes.IsValid(entitie[propertie])) {
                query[propertie] = {
                    [sequelize_1.Op.eq]: entitie[propertie]
                };
            }
        });
        console.log(query);
        return query;
    }
}
exports.Querying = Querying;
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