import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateRawTransactionRequestDTO {
  /**
   * to
   * @example: name
   */
  @ApiProperty()
  to: string;

  /**
   * amount
   * @example: name
   */
  @ApiProperty()
  amount: string;

  /**
   * feeRate
   * @example: feeRate
   */
  @ApiPropertyOptional()
  feeRate?: string;
}
