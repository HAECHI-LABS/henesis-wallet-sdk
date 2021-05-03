import { Balance } from "@haechi-labs/henesis-wallet-core/lib/types";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class BalanceDTO {
  /**
   * 암호화폐 타입
   * @example BTC
   */
  coinType?: string;

  /**
   * 총 잔액 (확정된 잔액) (단위: satoshi) (형식: 16진법)
   * @example 0xDBE16A831
   */
  amount?: string;

  /**
   * 출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액) (단위: satoshi) (형식: 16진법)
   * @example 0xDBE16A831
   */
  spendableAmount?: string;

  /**
   * 암호화폐 이름
   * @example 비트코인
   */
  name?: string;

  /**
   * 암호화폐 심볼 (ticker)
   * @example BTC
   */
  symbol?: string;

  static fromBalance(balance: Balance): BalanceDTO {
    return {
      coinType: balance.coinType,
      amount: balance.amount ? BNConverter.bnToHexString(balance.amount) : null,
      spendableAmount: balance.spendableAmount
        ? BNConverter.bnToHexString(balance.spendableAmount)
        : null,
      name: balance.name,
      symbol: balance.symbol,
    };
  }
}
