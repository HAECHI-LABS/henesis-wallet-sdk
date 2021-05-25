export class CreateRawTransactionRequestDTO {
  /**
   * to
   * @example: name
   */
  to: string;

  /**
   * 전송할 암호화폐의 양 (단위: satoshi) (형식: 16진법)
   * @example: 0x2ee
   */
  amount: string;

  /**
   * feeRate
   * @example: feeRate
   */
  feeRate?: string;
}
