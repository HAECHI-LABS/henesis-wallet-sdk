import { ApiProperty } from "@nestjs/swagger";

export class VerifyAddressRequestDTO {
  /**
   * 검증할 주소
   * @example: name
   */
  @ApiProperty()
  address: string;
}
