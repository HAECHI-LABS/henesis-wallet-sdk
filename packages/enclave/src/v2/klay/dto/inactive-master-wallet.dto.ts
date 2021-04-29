import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { Key } from "@haechi-labs/henesis-wallet-core/lib/types";
import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { ApiProperty } from "@nestjs/swagger";

export class InactiveMasterWalletDTO {
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

  blockchain: BlockchainType;

  /**
   * 지갑 ID
   * @example ETH
   */

  henesisKey: Key;

  /**
   * 지갑 ID
   * @example ETH
   */

  status: WalletStatus;

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
}
