import { BtcRawTransactionOutputDTO } from "./btc-raw-transaction-output.dto";
import { ApiProperty } from "@nestjs/swagger";
import { BtcTransactionOutputDTO } from "./btc-transaction-output.dto";

export class SendSignedTransactionRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */

  inputs: {
    transactionOutput: BtcTransactionOutputDTO;
    accountSignature: string;
  }[];

  /**
   * 지갑 ID
   * @example ETH
   */

  outputs: BtcRawTransactionOutputDTO[];
}
