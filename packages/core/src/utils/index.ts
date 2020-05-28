import BN from 'bn.js';

const Bytes = require('../vendor/eth-lib/bytes');
const { keccak256s } = require('../vendor/eth-lib/hash');

export const encodeSignature = ([v, r, s]) => Bytes.flatten([r, s, v]);
export const decodeSignature = (hex) => [
  Bytes.slice(64, Bytes.length(hex), hex),
  Bytes.slice(0, 32, hex),
  Bytes.slice(32, 64, hex),
];

export const toChecksum = (address) => {
  const addressHash = keccak256s(address.slice(2));
  let checksumAddress = '0x';
  for (let i = 0; i < 40; i++) {
    checksumAddress +=
      parseInt(addressHash[i + 2], 16) > 7
        ? address[i + 2].toUpperCase()
        : address[i + 2];
  }
  return checksumAddress;
};

export const bytesToWord = (bytes?: Uint8Array): number =>
  bytes.reduce((num, byte) => num * 0x100 + byte, 0);
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
