export class FlushRequestDTO {
  /**
   * 옮기고자 하는 코인/토큰의 기호 (symbol)
   * @example ETH
   */
  ticker: string;

  /**
   * 옮기고자 하는 사용자 지갑 ID 목록 (최대 50개)
   * @example [ "70d1205b97eb651413d34d14ec5cb285" ]
   */
  userWalletIds: string[];

  /**
   * 마스터 지갑의 비밀번호
   * @example passphrase
   */
  passphrase: string;

  /**
   * 트랜잭션에 사용할 gas price (단위: wei, peb)
   null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.
   * @example 0x1
   */
  gasPrice?: string;

  /**
   * 트랜잭션에 사용할 gas limit
   null일 경우, Henesis가 자동으로 설정합니다.
   * @example 0x1
   */
  gasLimit?: string;
}
