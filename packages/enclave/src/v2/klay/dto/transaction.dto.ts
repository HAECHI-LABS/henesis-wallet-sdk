import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { TransactionStatus } from "@haechi-labs/henesis-wallet-core";

export class TransactionDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  id: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  blockchain: BlockchainType;

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

  hash: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  error: string;

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
}
