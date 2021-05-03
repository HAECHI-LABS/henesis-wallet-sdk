import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import {
  BNConverter,
  Transaction,
  TransactionStatus,
} from "@haechi-labs/henesis-wallet-core";

export class TransactionDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  id?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  blockchain?: BlockchainType;

  /**
   * 지갑 ID
   * @example ETH
   */

  sender: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  keyId: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  hash?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  error?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  status: TransactionStatus;

  /**
   * 지갑 ID
   * @example ETH
   */

  isFeeDelegated: boolean;

  /**
   * 지갑 ID
   * @example ETH
   */

  fee?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  estimatedFee?: string;

  static fromTransaction(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      blockchain: transaction.blockchain,
      sender: transaction.sender,
      keyId: transaction.keyId,
      hash: transaction.hash,
      error: transaction.error,
      status: transaction.status,
      isFeeDelegated: transaction.isFeeDelegated,
      fee: transaction.fee ? BNConverter.bnToHexString(transaction.fee) : null,
      estimatedFee: transaction.estimatedFee
        ? BNConverter.bnToHexString(transaction.estimatedFee)
        : null,
    };
  }
}
