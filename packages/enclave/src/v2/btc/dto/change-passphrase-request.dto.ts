import { ApiProperty } from "@nestjs/swagger";

export class ChangePassphraseRequestDTO {
  /**
   * 현재 비밀번호
   * @example: name
   */

  passphrase: string;

  /**
   * 새로운 비밀번호
   * @example: name
   */

  newPassphrase: string;
}
