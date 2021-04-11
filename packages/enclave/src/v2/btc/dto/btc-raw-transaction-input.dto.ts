import { BtcTransactionOutputDTO } from "./btc-transaction-output.dto";
import { ApiProperty } from "@nestjs/swagger";

export class BtcRawTransactionInputDTO {
  /**
   * 수수료 금액
   * @example: name
   */
  @ApiProperty()
  redeemScript: string;

  /**
   * 수수료 금액
   * @example: name
   */
  @ApiProperty()
  transactionOutput: BtcTransactionOutputDTO;
}
