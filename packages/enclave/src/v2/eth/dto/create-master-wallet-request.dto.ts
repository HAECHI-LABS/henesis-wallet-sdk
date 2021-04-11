import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMasterWalletRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  type?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  name: String;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  passphrase?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  gasPrice?: string;
}
