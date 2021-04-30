import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class KeyDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  address?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  pub: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  keyFile?: string;
}
