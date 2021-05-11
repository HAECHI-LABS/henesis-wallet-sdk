import { BtcTransactionOutputDTO } from "./btc-transaction-output.dto";
import { BtcRawTransactionInput } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class BtcRawTransactionInputDTO {
  /**
   * redeemScript
   * @example: script
   */
  redeemScript: string;

  /**
   * 트랜잭션을 통해 생성된 UTXO의 Output
   * @example: BtcTransactionOutputDTO
   */
  transactionOutput: BtcTransactionOutputDTO;

  static fromBTCRawTransactionInput(
    input: BtcRawTransactionInput
  ): BtcRawTransactionInputDTO {
    return {
      redeemScript: input.redeemScript,
      transactionOutput: BtcTransactionOutputDTO.fromBTCTransactionOutput(
        input.transactionOutput
      ),
    };
  }
}
