import { ApiProperty } from "@nestjs/swagger";

export class CreateDepositAddressRequestDTO {
  /**
   * 입금 주소 이름
   * @example: name
   */

  name: string;
}
