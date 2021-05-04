export class CreateUserWalletRequestDTO {
  /**
   * 지갑 이름
   * @example bit
   */

  name: string;

  /**
   * 지갑 비밀번호
   * @example passphrase
   */

  passphrase: string;

  /**
   * 트랜잭션에 사용할 gas price (단위: wei, peb)
   * @example 0x1
   */

  gasPrice: string;

  /**
   * salt
   * @example salt
   */

  salt: string;
}
