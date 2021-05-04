import { BtcRawTransactionInputDTO } from "./btc-raw-transaction-input.dto";
import { BtcRawTransactionOutputDTO } from "./btc-raw-transaction-output.dto";
import { BtcRawTransaction } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class BtcRawTransactionDTO {
  /**
   * inputs
   * @example: name
   */

  inputs: BtcRawTransactionInputDTO[];

  /**
   * outputs
   * @example: name
   */

  outputs: BtcRawTransactionOutputDTO[];

  static fromBTCRawTransaction(
    transaction: BtcRawTransaction
  ): BtcRawTransactionDTO {
    return {
      inputs: transaction.inputs.map(
        BtcRawTransactionInputDTO.fromBTCRawTransactionInput
      ),
      outputs: transaction.outputs.map(
        BtcRawTransactionOutputDTO.fromBTCRawTransactionOutput
      ),
    };
  }
}
