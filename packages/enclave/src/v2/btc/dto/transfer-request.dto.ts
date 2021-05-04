export class TransferRequestDTO {
  /**
   * 받을 주소
   * @example: 2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm
   */

  to: string;

  /**
   * 보낼 금액
   * @example: 0x12
   */

  amount: string;

  /**
   * 비밀번호
   * @example: passphrase
   */

  passphrase: string;

  /**
   * 트랜잭션 vbyte당 지불할 fee 가격 (단위: satoshi)
   (16진법, 맨 앞에 반드시 '0x' 붙여야 함) (v2.10.9 이상 지원)
   * @example: 0xDB
   */

  feeRate: string;
}
