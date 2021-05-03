export class SendSignedTransactionRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  signedMultiSigPayload: string;

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
