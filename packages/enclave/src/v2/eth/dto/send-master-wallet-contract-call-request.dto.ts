import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SendMasterWalletContractCallRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  contractAddress: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  value: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  data: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  passphrase: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiProperty()
  otpCode: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  gasPrice?: string;

  /**
   * 지갑 ID
   * @example ETH
   */
  @ApiPropertyOptional()
  gasLimit?: string;
}
