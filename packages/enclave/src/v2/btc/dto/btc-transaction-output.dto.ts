import { ApiProperty } from "@nestjs/swagger";

export class BtcTransactionOutputDTO {
  /**
   * 전송 주소
   * @example: address
   */

  address: string;

  /**
   * 전송 금액
   * @example: name
   */

  amount: string;

  /**
   * 트랜잭션 ID
   * @example: name
   */

  transactionId: string;

  /**
   * outputIndex
   * @example: name
   */

  outputIndex: number;

  /**
   * scriptPubKey
   * @example: name
   */

  scriptPubKey: string;

  /**
   * isChange
   * @example: name
   */

  isChange: boolean;
}
