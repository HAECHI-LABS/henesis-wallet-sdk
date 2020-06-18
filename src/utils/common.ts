import BN from "bn.js";

import {
  toSnakeCase as toStringSnakeCase,
  toCamelCase as toStringCamelCase,
} from "./string";

export class ObjectConverter {
  static toSnakeCase(obj: any) {
    return this.changeObjectProperty(obj, toStringSnakeCase);
  }

  static toCamelCase(obj: any) {
    return this.changeObjectProperty(obj, toStringCamelCase);
  }

  static changeObjectProperty(o, converter: (obj: any) => any) {
    if (Array.isArray(o)) {
      return o.map(i => this.changeObjectProperty(i, converter));
    }

    if (typeof o === "object") {
      if (!o) {
        return null;
      }
      const n = {};

      Object.keys(o).forEach(k => {
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
    if (!hexString.startsWith("0x")) {
      throw new Error(`invalid hex string format: ${hexString}`);
    }
    return new BN(this.remove0x(hexString), 16);
  }
}
