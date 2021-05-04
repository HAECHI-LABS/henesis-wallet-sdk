export class SendUserWalletContractCallRequestDTO {
  /**
   * 트랜잭션을 보낼 스마트 컨트랙트 주소
   * @example 0x2c27695429903b1e36299ce1eb89a3c1c34d115d
   */

  contractAddress: string;

  /**
   * 트랜잭션에 담을 암호화폐의 양
   * @example 0x1
   */

  value: string;

  /**
   * 트랜잭션에 담을 데이터
   * @example data
   */

  data: string;

  /**
   * 지갑의 비밀번호
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
