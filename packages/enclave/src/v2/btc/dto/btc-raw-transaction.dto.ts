import { BtcRawTransactionInputDTO } from "./btc-raw-transaction-input.dto";
import { BtcRawTransactionOutputDTO } from "./btc-raw-transaction-output.dto";
import { ApiProperty } from "@nestjs/swagger";

export class BtcRawTransactionDTO {
  /**
   * inputs
   * @example: name
   */
  @ApiProperty()
  inputs: BtcRawTransactionInputDTO[];

  /**
   * outputs
   * @example: name
   */
  @ApiProperty()
  outputs: BtcRawTransactionOutputDTO[];
}
