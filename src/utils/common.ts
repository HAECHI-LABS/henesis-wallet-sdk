import BN from "bn.js";

import {
  toCamelCase as toStringCamelCase,
  toSnakeCase as toStringSnakeCase,
} from "./string";
import _ from "lodash";
import { FormatInvalidError, ValidationParameterError } from "../error";

const packageJson = require("../../package.json");

export class ObjectConverter {
  static toSnakeCase(obj: any) {
    return this.changeObjectProperty(obj, toStringSnakeCase);
  }

  static toCamelCase(obj: any) {
    return this.changeObjectProperty(obj, toStringCamelCase);
  }

  static changeObjectProperty(o, converter: (obj: any) => any) {
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

export class BNConverter {
  static add0x(hexString: string): string {
    if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
      return hexString;
    }
    return `0x${hexString}`;
  }

  static remove0x(hexString: string): string {
    if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
      return hexString.substring(2);
    }
    return hexString;
  }

  static bnToHexString(bn: BN): string {
    return `0x${bn.toString(16)}`;
  }

  static hexStringToBN(hexString: string) {
    if (
      _.isEmpty(hexString) ||
      ["undefined", "null"].some((nil) => nil === hexString)
    ) {
      return new BN(0);
    }
    if (!hexString.startsWith("0x")) {
      throw new FormatInvalidError(
        `invalid hex string format${
          !_.isEmpty(hexString) ? `: ${hexString}` : ""
        }`
      );
    }

    return new BN(this.remove0x(hexString), 16);
  }

  static bnToHexStringOrElseNull(bn: BN): string | null {
    if (bn == null) {
      return null;
    }
    return this.bnToHexString(bn);
  }

  static hexStringToBnOrElseNull(hexString: string): BN | null {
    if (hexString == null) {
      return null;
    }
    return this.hexStringToBN(hexString);
  }
}

export function checkNullAndUndefinedParameter(requiredParams: object): void {
  Object.entries(requiredParams).forEach((o) => {
    if (_.isUndefined(o[1])) {
      throw new ValidationParameterError(`${o[0]} is undefined`);
    }
    if (_.isNull(o[1])) {
      throw new ValidationParameterError(`${o[0]} is null`);
    }
    if (_.isNaN(o[1])) {
      throw new ValidationParameterError(`${o[0]} is NaN`);
    }
    if (_.isPlainObject(o[1])) {
      checkNullAndUndefinedParameter(_.fromPairs(o));
    }
  });
}

export class HexConverter {
  static add0x(hexString: string): string {
    if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
      return hexString;
    }
    return `0x${hexString}`;
  }

  static remove0x(hexString: string): string {
    if (hexString.length > 2 && hexString.substring(0, 2) == "0x") {
      return hexString.substring(2);
    }
    return hexString;
  }
}
