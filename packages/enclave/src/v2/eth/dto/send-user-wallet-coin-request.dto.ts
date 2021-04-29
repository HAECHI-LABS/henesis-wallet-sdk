import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SendUserWalletCoinRequestDTO {
  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  ticker: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  to: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  amount: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  passphrase: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  otpCode: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  gasPrice?: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  gasLimit?: string;
}
