import { BNConverter, MultiSigPayload } from "@haechi-labs/henesis-wallet-core";

export class MultiSigPayloadDTO {
  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example ETH
   */
  walletAddress: string;

  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example ETH
   */
  toAddress: string;

  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example ETH
   */
  value: string;

  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example ETH
   */
  walletNonce: string;

  /**
   * 지갑이 속한 팀(Org)의 ID
   * @example ETH
   */
  hexData: string;

  static fromMultiSigPayload(payload: MultiSigPayload): MultiSigPayloadDTO {
    return {
      walletAddress: payload.walletAddress,
      toAddress: payload.toAddress,
      value: payload.value ? BNConverter.bnToHexString(payload.value) : null,
      walletNonce: payload.walletNonce
        ? BNConverter.bnToHexString(payload.walletNonce)
        : null,
      hexData: payload.hexData,
    };
  }
}
