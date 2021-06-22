export class CreateDepositAddressRequestDTO {
  /**
   * 입금 주소 이름
   * @example test-deposit-address
   */
  name: string;

  /**
   * 지갑 비밀번호
   * @example passphrase
   */
  passphrase: string;
}
