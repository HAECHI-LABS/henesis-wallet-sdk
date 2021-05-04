import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SendMasterWalletCoinRequestDTO {
  /**
   * 지갑 이름
   * @example ETH
   */

  ticker: string;

  /**
   * 지갑 이름
   * @example ETH
   */

  to: string;

  /**
   * 지갑 이름
   * @example ETH
   */

  amount: string;

  /**
   * 지갑 이름
   * @example ETH
   */

  passphrase: string;

  /**
   * 지갑 이름
   * @example ETH
   */

  otpCode: string;

  /**
   * 지갑 이름
   * @example ETH
   */

  gasPrice?: string;

  /**
   * 지갑 이름
   * @example ETH
   */

  gasLimit?: string;
}
