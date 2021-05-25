import { BtcRawTransactionOutput } from "@haechi-labs/henesis-wallet-core/lib/btc/wallet";

export class BtcRawTransactionOutputDTO {
  /**
   * 받을 주소
   * @example: 2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm
   */
  to: string;

  /**
   * 전송할 암호화폐의 양 (단위: satoshi) (형식: 16진법)
   * @example: 0x12
   */
  amount: string;

  /**
   * 전송 후 잔액을 자신의 지갑으로 다시 보내는 Output인가?
   * @example: false
   */
  isChange: boolean;

  static fromBTCRawTransactionOutput(
    output: BtcRawTransactionOutput
  ): BtcRawTransactionOutputDTO {
    return {
      to: output.to,
      amount: output.amount,
      isChange: output.isChange,
    };
  }
}
