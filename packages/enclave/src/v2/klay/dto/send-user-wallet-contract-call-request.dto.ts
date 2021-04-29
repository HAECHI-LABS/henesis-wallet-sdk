import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SendUserWalletContractCallRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  contractAddress: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  value: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  data: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  passphrase: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  otpCode: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  gasPrice?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  gasLimit?: string;
}
