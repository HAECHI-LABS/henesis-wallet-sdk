import { BtcTransactionOutputDTO } from "./btc-transaction-output.dto";
import { BtcRawTransactionInput } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class BtcRawTransactionInputDTO {
  /**
   * 수수료 금액
   * @example: name
   */

  redeemScript: string;

  /**
   * 수수료 금액
   * @example: name
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
