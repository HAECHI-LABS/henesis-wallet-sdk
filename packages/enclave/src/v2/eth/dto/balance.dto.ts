import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import BN from "bn.js";

export class BalanceDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  coinId: number | null;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  coinType: string;

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
  @ApiPropertyOptional()
  spendableAmount?: BN;

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
  symbol: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  aggregatedAmount?: BN;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  decimals: number;
}
