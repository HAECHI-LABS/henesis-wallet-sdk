import { WalletStatus } from "@haechi-labs/henesis-wallet-core/lib/wallet";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class WalletDTO {
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
  address: string;

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
  blockchain: BlockchainType;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  version: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  transactionId?: string | null;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  error?: string | null;
}
