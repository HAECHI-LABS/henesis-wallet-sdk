import { ApiProperty } from "@nestjs/swagger";
import { BtcTransactionOutputDTO } from "./btc-transaction-output.dto";

export class BtcTransactionDTO {
  /**
   * 블록
   * @example: name
   */
  @ApiProperty()
  blockNumber: string;

  /**
   * 수수료 금액
   * @example: name
   */
  @ApiProperty()
  feeAmount?: string;

  /**
   * 전송 금액
   * @example: name
   */
  @ApiProperty()
  amount: string;

  /**
   * outputs
   * @example: name
   */
  @ApiProperty()
  outputs: BtcTransactionOutputDTO[];
}
