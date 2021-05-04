import { ApiProperty } from "@nestjs/swagger";

export class TransferRequestDTO {
  /**
   * 받을 주소
   * @example: name
   */

  to: string;

  /**
   * 보낼 금액
   * @example: name
   */

  amount: string;

  /**
   * 비밀번호
   * @example: name
   */

  passphrase: string;

  /**
   * OTP 코드
   * @example: name
   */

  otpCode: string;

  /**
   * 수수료율
   * @example: name
   */

  feeRate: string;
}
