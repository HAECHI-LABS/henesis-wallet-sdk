import * as BN from "bn.js";
import { ApiProperty } from "@nestjs/swagger";

export class EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  id: number;

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

  status: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  transactionHash?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  walletId: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  transactionId?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  orgId?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  masterWalletId?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  confirmation: string;
}
