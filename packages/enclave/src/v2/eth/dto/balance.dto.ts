import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class BalanceDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  coinId: number | null;

  /**
   * 지갑 ID
   * @example ETH
   */

  coinType: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  amount: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  spendableAmount?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  name: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  symbol: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  aggregatedAmount?: string;

  /**
   * 지갑 ID
   * @example ETH
   */

  decimals: number;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinId: balance.coinId,
      coinType: balance.coinType,
      amount: balance.amount ? BNConverter.bnToHexString(balance.amount) : null,
      spendableAmount: balance.spendableAmount
        ? BNConverter.bnToHexString(balance.spendableAmount)
        : null,
      name: balance.name,
      symbol: balance.symbol,
      aggregatedAmount: balance.aggregatedAmount
        ? BNConverter.bnToHexString(balance.aggregatedAmount)
        : null,
      decimals: balance.decimals,
    };
  }
}
