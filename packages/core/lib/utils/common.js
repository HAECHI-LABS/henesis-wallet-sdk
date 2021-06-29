"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexConverter = exports.checkNullAndUndefinedParameter = exports.BNConverter = exports.ObjectConverter = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const string_1 = require("./string");
const lodash_1 = __importDefault(require("lodash"));
const error_1 = require("../error");
const packageJson = require("../../package.json");
class ObjectConverter {
    static toSnakeCase(obj) {
        return this.changeObjectProperty(obj, string_1.toSnakeCase);
    }
    static toCamelCase(obj) {
        return this.changeObjectProperty(obj, string_1.toCamelCase);
    }
    static changeObjectProperty(o, converter) {
        if (Array.isArray(o)) {
            return o.map((i) => this.changeObjectProperty(i, converter));
        }
        if (typeof o === "object") {
            if (!o) {
                return null;
            }
            const n = {};
            Object.keys(o).forEach((k) => {
                n[converter(k)] = this.changeObjectProperty(o[k], converter);
            });
            return n;
        }
        return o;
    }
}
exports.ObjectConverter = ObjectConverter;
class BNConverter {
    static add0x(hexString) {
        if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
            return hexString;
        }
        return `0x${hexString}`;
    }
    static remove0x(hexString) {
        if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
            return hexString.substring(2);
        }
        return hexString;
    }
    static bnToHexString(bn) {
        return `0x${bn.toString(16)}`;
    }
    static hexStringToBN(hexString) {
        if (lodash_1.default.isEmpty(hexString) ||
            ["undefined", "null"].some((nil) => nil === hexString)) {
            return new bn_js_1.default(0);
        }
        if (!hexString.startsWith("0x")) {
            throw new error_1.FormatInvalidError(`invalid hex string format${!lodash_1.default.isEmpty(hexString) ? `: ${hexString}` : ""}`);
        }
        return new bn_js_1.default(this.remove0x(hexString), 16);
    }
    static bnToHexStringOrElseNull(bn) {
        if (bn == null) {
            return null;
        }
        return this.bnToHexString(bn);
    }
    static hexStringToBnOrElseNull(hexString) {
        if (hexString == null) {
            return null;
        }
        return this.hexStringToBN(hexString);
    }
}
exports.BNConverter = BNConverter;
function checkNullAndUndefinedParameter(requiredParams) {
    Object.entries(requiredParams).forEach((o) => {
        if (lodash_1.default.isUndefined(o[1])) {
            throw new error_1.ValidationParameterError(`${o[0]} is undefined`);
        }
        if (lodash_1.default.isNull(o[1])) {
            throw new error_1.ValidationParameterError(`${o[0]} is null`);
        }
        if (lodash_1.default.isNaN(o[1])) {
            throw new error_1.ValidationParameterError(`${o[0]} is NaN`);
        }
        if (lodash_1.default.isPlainObject(o[1])) {
            checkNullAndUndefinedParameter(lodash_1.default.fromPairs(o));
        }
    });
}
exports.checkNullAndUndefinedParameter = checkNullAndUndefinedParameter;
class HexConverter {
    static add0x(hexString) {
        if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
            return hexString;
        }
        return `0x${hexString}`;
    }
    static remove0x(hexString) {
        if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
            return hexString.substring(2);
        }
        return hexString;
    }
}
exports.HexConverter = HexConverter;
//# sourceMappingURL=common.js.map