import { ApiProperty } from "@nestjs/swagger";
import { BtcTransactionOutputDTO } from "./btc-transaction-output.dto";

export class BtcTransactionDTO {
  /**
   * 블록
   * @example: name
   */

  blockNumber: string;

  /**
   * 수수료 금액
   * @example: name
   */

  feeAmount?: string;

  /**
   * 전송 금액
   * @example: name
   */

  amount: string;

  /**
   * outputs
   * @example: name
   */

  outputs: BtcTransactionOutputDTO[];
}
