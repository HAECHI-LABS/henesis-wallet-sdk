import { BtcRawTransactionInputDTO } from "./btc-raw-transaction-input.dto";
import { BtcRawTransactionOutputDTO } from "./btc-raw-transaction-output.dto";
import { BtcRawTransaction } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class BtcRawTransactionDTO {
  /**
   * 트랜잭션을 통해 생성된 UTXO의 Raw Input
   * @example: name
   */
  inputs: BtcRawTransactionInputDTO[];

  /**
   * 트랜잭션을 통해 생성된 UTXO의 Raw Output
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
