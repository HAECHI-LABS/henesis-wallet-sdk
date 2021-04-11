import { ApiProperty } from "@nestjs/swagger";

export class BtcTransactionOutputDTO {
  /**
   * 전송 주소
   * @example: address
   */
  @ApiProperty()
  address: string;

  /**
   * 전송 금액
   * @example: name
   */
  @ApiProperty()
  amount: string;

  /**
   * 트랜잭션 ID
   * @example: name
   */
  @ApiProperty()
  transactionId: string;

  /**
   * outputIndex
   * @example: name
   */
  @ApiProperty()
  outputIndex: number;

  /**
   * scriptPubKey
   * @example: name
   */
  @ApiProperty()
  scriptPubKey: string;

  /**
   * isChange
   * @example: name
   */
  @ApiProperty()
  isChange: boolean;
}
