import * as BN from "bn.js";
import { ApiProperty } from "@nestjs/swagger";

export class EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  id: number;

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
  status: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  transactionHash?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  walletId: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  transactionId?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  orgId?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  masterWalletId?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  confirmation: BN;
}
