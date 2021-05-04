import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class BalanceDTO {
  /**
   * Coin의 ID
   * @example 2
   */

  coinId: number | null;

  /**
   * 암호화폐 타입
   * @example ETHEREUM
   */

  coinType: string;

  /**
   * 확정된 잔액 (단위: wei, peb) (16진법)
   * @example 0x6e59a23fd4698039
   */

  amount: string;

  /**
   * 출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액)
   (단위: wei, peb) (형식: 16진법)
   * @example 0x6e59592eb170bcb9
   */

  spendableAmount?: string;

  /**
   * 암호화폐 이름
   * @example Ethereum
   */

  name: string;

  /**
   * 암호화폐 심볼 (ticker)
   * @example ETH
   */

  symbol: string;

  /**
   * aggregatedAmount
   * @example 0x6e59592eb170bcb9
   */

  aggregatedAmount?: string;

  /**
   * 암호화폐의 소수점 자릿수
   * @example 18
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
