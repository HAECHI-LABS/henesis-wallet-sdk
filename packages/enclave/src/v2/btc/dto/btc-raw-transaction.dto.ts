import { BtcRawTransactionInputDTO } from "./btc-raw-transaction-input.dto";
import { BtcRawTransactionOutputDTO } from "./btc-raw-transaction-output.dto";
import { ApiProperty } from "@nestjs/swagger";

export class BtcRawTransactionDTO {
  /**
   * inputs
   * @example: name
   */

  inputs: BtcRawTransactionInputDTO[];

  /**
   * outputs
   * @example: name
   */

  outputs: BtcRawTransactionOutputDTO[];
}
