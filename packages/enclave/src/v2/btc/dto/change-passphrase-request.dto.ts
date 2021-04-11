import { ApiProperty } from "@nestjs/swagger";

export class ChangePassphraseRequestDTO {
  /**
   * 현재 비밀번호
   * @example: name
   */
  @ApiProperty()
  passphrase: string;

  /**
   * 새로운 비밀번호
   * @example: name
   */
  @ApiProperty()
  newPassphrase: string;
}
