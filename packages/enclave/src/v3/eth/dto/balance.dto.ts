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
  amount: number;

  /**
   * 출금 가능한 잔액 (= 총 잔액 - 확정되지 않은 출금 요청액)(단위: wei, peb)
   * @example 1000000000000
   */
  spendableAmount: number;

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
}
