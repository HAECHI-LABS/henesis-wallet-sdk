import { BtcRawTransactionOutputDTO } from "./btc-raw-transaction-output.dto";
import { BtcTransactionOutputDTO } from "./btc-transaction-output.dto";

interface Input {
  transactionOutput: BtcTransactionOutputDTO;
  accountSignature: string;
}

export class SendSignedTransactionRequestDTO {
  /**
   * 지갑 ID
   * @example ETH
   */
  inputs: Input[];

  /**
   * 지갑 ID
   * @example ETH
   */
  outputs: BtcRawTransactionOutputDTO[];
}
