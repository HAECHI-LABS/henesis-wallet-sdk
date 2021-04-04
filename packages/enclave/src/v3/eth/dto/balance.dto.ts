import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import BN from "bn.js";

export class BalanceDTO {
  /**
   * Henesis에서 부여한 Coin의 ID
   * @example 11
   */
  coinId: string;

  /**
   * 확정된 잔액 (단위: wei, peb)
   * @example 1000000000000
   */
  amount: string;

  /**
   * 출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액)(단위: wei, peb)
   * @example 1000000000000
   */
  spendableAmount: string;

  /**
   * 코인 이름
   * @example ethereum
   */
  name: string;

  /**
   * 코인의 기호
   * @example ETH
   */
  ticker: string;

  /**
   * 코인의 소수점 자릿수
   * @example 18
   */
  decimals: number;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinId: balance.coinId.toString(),
      amount: balance.amount.toString(10),
      spendableAmount: balance.spendableAmount.toString(10),
      name: balance.name,
      ticker: balance.symbol,
      decimals: balance.decimals,
    };
  }
}
