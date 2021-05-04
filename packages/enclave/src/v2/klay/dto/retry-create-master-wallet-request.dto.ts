import { ApiPropertyOptional } from "@nestjs/swagger";

export class RetryCreateMasterWalletRequestDTO {
  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  gasPrice?: string;
}
