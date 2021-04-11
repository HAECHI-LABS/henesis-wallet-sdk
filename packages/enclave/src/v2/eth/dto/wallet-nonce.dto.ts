import { ApiProperty } from "@nestjs/swagger";

export class WalletNonceDTO {
  /**
   * nonce
   * @example ETH
   */
  @ApiProperty()
  nonce: string;
}
