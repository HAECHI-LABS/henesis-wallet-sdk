import { BtcEstimatedFee } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class EstimationFeeDTO {
  /**
   * 예상 수수료
   * @example 0x9c
   */
  estimatedFee: string;

  static fromBTCEstimatedFee(estimated: BtcEstimatedFee): EstimationFeeDTO {
    return {
      estimatedFee: estimated.estimatedFee,
    };
  }
}
