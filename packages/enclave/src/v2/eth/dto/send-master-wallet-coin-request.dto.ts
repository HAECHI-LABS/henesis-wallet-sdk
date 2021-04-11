import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SendMasterWalletCoinRequestDTO {
  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiProperty()
  ticker: string;

  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiProperty()
  to: string;

  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiProperty()
  amount: string;

  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiProperty()
  passphrase: string;

  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiProperty()
  otpCode: string;

  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiPropertyOptional()
  gasPrice?: string;

  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiPropertyOptional()
  gasLimit?: string;
}
