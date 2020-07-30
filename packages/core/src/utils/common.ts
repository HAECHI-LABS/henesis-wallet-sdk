import BN from "bn.js";

import {
  toCamelCase as toStringCamelCase,
  toSnakeCase as toStringSnakeCase,
} from "./string";
import { BtcTransaction, BtcTransactionOutput } from "../btc/wallet";
import { Transfer } from "../btc/transfers";
import { TransferDTO } from "../__generate__/btc";
import _ from "lodash";
import {
  FormatInvalidError,
  HenesisError,
  ValidationParameterError,
} from "../error";

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
    if (_.isEmpty(hexString)) {
      throw new ValidationParameterError("hexString is empty");
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
}

export const parseResponseToTransfer = (t: TransferDTO): Transfer => {
  return {
    id: t.id,
    walletId: t.walletId,
    outputIndex: t.outputIndex,
    updatedAt: t.updatedAt,
    transaction: {
      id: t.transaction.id,
      transactionHash: t.transaction.transactionHash,
      amount: BNConverter.hexStringToBN(String(t.transaction.amount)),
      blockNumber: t.transaction.blockNumber
        ? BNConverter.hexStringToBN(String(t.transaction.blockNumber))
        : null,
      feeAmount: t.transaction.feeAmount
        ? BNConverter.hexStringToBN(String(t.transaction.feeAmount))
        : null,
      createdAt: t.transaction.createdAt,
      hex: t.transaction.hex,
      outputs: t.transaction.outputs.map((o) => {
        return {
          transactionId: o.transactionId,
          outputIndex: o.outputIndex,
          address: o.address,
          scriptPubKey: o.scriptPubKey,
          amount: BNConverter.hexStringToBN(String(o.amount)),
          isChange: o.isChange,
        } as BtcTransactionOutput;
      }),
    } as BtcTransaction,
    receivedAt: t.receivedAt,
    sendTo: t.sendTo,
    type: t.type,
    status: t.status,
    createdAt: t.createdAt,
  };
};

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
