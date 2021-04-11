import { ApiProperty } from "@nestjs/swagger";

export class BtcRawTransactionOutputDTO {
  /**
   * 수수료 금액
   * @example: name
   */
  @ApiProperty()
  to: string;

  /**
   * 수수료 금액
   * @example: name
   */
  @ApiProperty()
  amount: string;

  /**
   * 수수료 금액
   * @example: name
   */
  @ApiProperty()
  isChange: boolean;
}
