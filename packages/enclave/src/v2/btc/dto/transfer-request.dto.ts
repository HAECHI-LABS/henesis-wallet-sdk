import { ApiProperty } from "@nestjs/swagger";

export class TransferRequestDTO {
  /**
   * 받을 주소
   * @example: name
   */
  @ApiProperty()
  to: string;

  /**
   * 보낼 금액
   * @example: name
   */
  @ApiProperty()
  amount: string;

  /**
   * 비밀번호
   * @example: name
   */
  @ApiProperty()
  passphrase: string;

  /**
   * OTP 코드
   * @example: name
   */
  @ApiProperty()
  otpCode: string;

  /**
   * 수수료율
   * @example: name
   */
  @ApiProperty()
  feeRate: string;
}
