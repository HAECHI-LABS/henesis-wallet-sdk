import BN from 'bn.js';
import { toChecksum } from "../eth/keychains";
import { keccak256s } from "../eth/eth-core-lib/hash";

export const verifyCommonAddress = (address: string) => {
  if (!/^(0x|0X)?[0-9a-fA-F]{40}$/i.test(address)) {
    return false;
  }

  const lowerCaseAddress = address.toLowerCase();
  const checksumAddress = toChecksum(lowerCaseAddress);
  const addressHash = keccak256s(lowerCaseAddress.slice(2));
  for (let i = 0; i < 40; i++) {
    if (
      (parseInt(addressHash[i + 2], 16) > 7 &&
        lowerCaseAddress[i + 2].toUpperCase() !== checksumAddress[i + 2]) ||
      (parseInt(addressHash[i + 2], 16) <= 7 &&
        lowerCaseAddress[i + 2].toLowerCase() !== checksumAddress[i + 2])
    ) {
      return false;
    }
  }

  return true;
};

export const toSnakeCase = (s) =>
  s.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase();
export class ObjectConverter {
  static toSnakeCase(obj: any) {
    const toSnake = (s) =>
      s.replace(/[\w]([A-Z])/g, (m) => `${m[0]}_${m[1]}`).toLowerCase();

    return this.changeObjectProperty(obj, toSnake);
  }

  static toCamelCase(obj: any) {
    const toCamel = (s) =>
      s.replace(/([-_][a-z])/gi, ($1) =>
        $1.toUpperCase().replace('-', '').replace('_', ''),
      );

    return this.changeObjectProperty(obj, toCamel);
  }

  static changeObjectProperty(o, converter: (obj: any) => any) {
    if (Array.isArray(o)) {
      return o.map((i) => this.changeObjectProperty(i, converter));
    }

    if (typeof o === 'object') {
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
    if (hexString.length > 2 && hexString.substring(0, 2) == '0x') {
      return hexString;
    }
    return `0x${hexString}`;
  }

  static remove0x(hexString: string): string {
    if (hexString.length > 2 && hexString.substring(0, 2) == '0x') {
      return hexString.substring(2);
    }
    return hexString;
  }

  static bnToHexString(bn: BN): string {
    return `0x${bn.toString(16)}`;
  }

  static hexStringToBN(hexString: string) {
    if (!hexString.startsWith('0x')) {
      throw new Error(`invalid hex string format: ${hexString}`);
    }
    return new BN(this.remove0x(hexString), 16);
  }
}
