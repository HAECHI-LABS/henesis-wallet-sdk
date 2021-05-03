export class ChangePassphraseRequestDTO {
  /**
   * 현재 비밀번호
   * @example: passphrase
   */

  passphrase: string;

  /**
   * 새로운 비밀번호
   * @example: newPassphrase
   */

  newPassphrase: string;
}
