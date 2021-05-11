import * as BN from "bn.js";

interface MultiSigPayload {
  walletAddress: string;
  toAddress: string;
  value: string;
  walletNonce: string;
  hexData: string;
}

interface SignedMultiSigPayload {
  signature: string;
  multiSigPayload: MultiSigPayload | null;
}

export class SendSignedTransactionRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  signedMultiSigPayload: SignedMultiSigPayload;

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
