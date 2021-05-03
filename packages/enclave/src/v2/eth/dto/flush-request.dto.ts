export class FlushRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  ticker: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  userWalletIds: string[];

  /**
   * 지갑 ID
   * @example ETH
   */

  passphrase: string;

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
