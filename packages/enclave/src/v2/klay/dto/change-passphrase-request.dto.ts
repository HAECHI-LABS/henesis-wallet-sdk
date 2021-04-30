import { ApiProperty } from "@nestjs/swagger";

export class ChangePassphraseRequestDTO {
  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  passphrase: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  newPassphrase: string;

  /**
   * 변경할 지갑 이름
   * @example ETH
   */

  otpCode: string;
}
