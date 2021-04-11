import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class KeyDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  address?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  pub: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  keyFile?: string;
}
