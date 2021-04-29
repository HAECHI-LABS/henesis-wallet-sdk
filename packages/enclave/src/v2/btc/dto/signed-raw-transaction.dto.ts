import { BtcTransactionDTO } from "./btc-transaction.dto";

export class SignedRawTransactionDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  transaction: BtcTransactionDTO;

  /**
   * 전송 금액
   * @example ETH
   */
  amount: string;

  /**
   * 수수료 금액
   * @example ETH
   */
  feeAmount?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  confirmation: string;
}
