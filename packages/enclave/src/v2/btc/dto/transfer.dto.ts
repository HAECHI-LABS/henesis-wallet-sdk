import { BtcTransactionDTO } from "./btc-transaction.dto";

export class TransferDTO {
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
   * 전송 금액
   * @example ETH
   */
  status: string;

  /**
   * 전송 금액
   * @example ETH
   */
  id: string;

  /**
   * outputIndex
   * @example ETH
   */
  outputIndex?: number;

  /**
   * receivedAt
   * @example ETH
   */
  receivedAt?: string;

  /**
   * sendTo
   * @example ETH
   */
  sendTo?: string;

  /**
   * 전송 금액
   * @example ETH
   */
  withdrawalApprovalId?: string;

  /**
   * 전송 금액
   * @example ETH
   */
  type: string;

  /**
   * 전송 금액
   * @example ETH
   */
  createdAt: string;

  /**
   * 전송 금액
   * @example ETH
   */
  updatedAt: string;

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
