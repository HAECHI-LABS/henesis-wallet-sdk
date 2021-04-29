import { ApiProperty } from "@nestjs/swagger";

export class BtcRawTransactionOutputDTO {
  /**
   * 수수료 금액
   * @example: name
   */

  to: string;

  /**
   * 수수료 금액
   * @example: name
   */

  amount: string;

  /**
   * 수수료 금액
   * @example: name
   */

  isChange: boolean;
}
