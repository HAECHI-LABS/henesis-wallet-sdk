export class SendUserWalletCoinRequestDTO {
  /**
   * 암호화폐의 기호 (symbol)
   * @example ETH
   */

  ticker: string;

  /**
   * 암호화폐를 받을 지갑 주소
   * @example 0x2c27695429903b1e36299ce1eb89a3c1c34d115d
   */

  to: string;

  /**
   * 암호화폐의 양 (단위: wei, peb)
   (16진법, 맨 앞에 반드시 '0x' 붙여야 함)
   * @example 0xDBE16A831
   */

  amount: string;

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
