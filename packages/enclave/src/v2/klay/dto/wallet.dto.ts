import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";

export class WalletDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  id: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  name: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  address: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  createdAt: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  updatedAt: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  status: WalletStatus;

  /**
   * 지갑 ID
   * @example ETH
   */

  blockchain: BlockchainType;

  /**
   * 지갑 ID
   * @example ETH
   */

  version: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  transactionId?: string | null;

  /**
   * 지갑 ID
   * @example ETH
   */

  error?: string | null;
}
