import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { Key } from "@haechi-labs/henesis-wallet-core/lib/types";
import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { ApiProperty } from "@nestjs/swagger";

export class InactiveMasterWalletDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  id: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  name: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  blockchain: BlockchainType;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  henesisKey: Key;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  status: WalletStatus;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  createdAt: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  updatedAt: string;
}
