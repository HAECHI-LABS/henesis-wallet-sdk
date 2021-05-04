export class CreateRawTransactionRequestDTO {
  /**
   * to
   * @example: name
   */

  to: string;

  /**
   * amount
   * @example: name
   */

  amount: string;

  /**
   * feeRate
   * @example: feeRate
   */

  feeRate?: string;
}
