import BN from "bn.js";
import { ApiProperty } from "@nestjs/swagger";

export class MethodGasUsageDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  id: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  blockchain: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  name: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  estimatedGasConsumption: string;
}
