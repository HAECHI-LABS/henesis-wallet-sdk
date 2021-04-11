import BN from "bn.js";
import { ApiProperty } from "@nestjs/swagger";

export class MethodGasUsageDTO {
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
  blockchain: string;

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
  estimatedGasConsumption: BN;
}
