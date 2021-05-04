import { ApiProperty } from "@nestjs/swagger";

export class CreateInactiveMasterWalletRequestDTO {
  /**
   * 생성할 지갑 이름
   * @example: name
   */

  name: string;
}
