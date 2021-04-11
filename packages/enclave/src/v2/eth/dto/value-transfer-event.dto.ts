import { ApiProperty } from "@nestjs/swagger";
import { EventDTO } from "./event.dto";
import * as BN from "bn.js";

export class ValueTransferEventDTO extends EventDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  amount: BN;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  decimals: number;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  coinSymbol: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  from: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  to: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  transferType: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  walletName: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  walletType: string;
}
