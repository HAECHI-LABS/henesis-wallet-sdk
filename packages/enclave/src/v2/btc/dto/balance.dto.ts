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
   * @example ETH
   */
  name?: string;

  /**
   * 암호화폐 심볼 (ticker)
   * @example ETH
   */
  symbol?: string;
}
