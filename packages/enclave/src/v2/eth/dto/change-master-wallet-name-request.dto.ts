import { ApiProperty } from "@nestjs/swagger";

export class ChangeMasterWalletNameRequestDTO {
  /**
   * 지갑 이름
   * @example ETH
   */
  @ApiProperty()
  name: string;
}
