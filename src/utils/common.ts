import BN from "bn.js";

import {
  toCamelCase as toStringCamelCase,
  toSnakeCase as toStringSnakeCase,
} from "./string";
import { BtcTransaction, BtcTransactionOutput } from "../btc/wallet";
import { Transfer } from "../btc/transfers";
import {
  TransactionDTO as BtcTransactionDTO,
  TransferDTO,
} from "../__generate__/btc";
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

export const convertBtcTransactionDTO = (
  transaction: BtcTransactionDTO
): BtcTransaction => {
  return {
    ...transaction,
    amount: BNConverter.hexStringToBN(String(transaction.amount)),
    blockNumber: transaction.blockNumber
      ? BNConverter.hexStringToBN(String(transaction.blockNumber))
      : null,
    feeAmount: transaction.feeAmount
      ? BNConverter.hexStringToBN(String(transaction.feeAmount))
      : null,
    outputs: transaction.outputs.map((o) => {
      return {
        transactionId: o.transactionId,
        outputIndex: o.outputIndex,
        address: o.address,
        scriptPubKey: o.scriptPubKey,
        amount: BNConverter.hexStringToBN(String(o.amount)),
        isChange: o.isChange,
      } as BtcTransactionOutput;
    }),
  };
};

export const parseResponseToTransfer = (t: TransferDTO): Transfer => {
  return {
    ...t,
    transaction: t.transaction ? convertBtcTransactionDTO(t.transaction) : null,
    feeAmount: t.feeAmount ? BNConverter.hexStringToBN(t.feeAmount) : null,
    amount: BNConverter.hexStringToBN(t.amount),
    confirmation: BNConverter.hexStringToBN(t.confirmation),
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
