import { ApiProperty } from "@nestjs/swagger";

export class ChangeWalletNameRequestDTO {
  /**
   * 변경할 지갑 이름
   * @example: name
   */

  name: string;
}
