import { BtcRawTransactionOutput } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class BtcRawTransactionOutputDTO {
  /**
   * 수수료 금액
   * @example: name
   */

  to: string;

  /**
   * 수수료 금액
   * @example: name
   */

  amount: string;

  /**
   * 수수료 금액
   * @example: name
   */

  isChange: boolean;

  static fromBTCRawTransactionOutput(
    output: BtcRawTransactionOutput
  ): BtcRawTransactionOutputDTO {
    return {
      to: output.to,
      amount: output.amount,
      isChange: output.isChange,
    };
  }
}
