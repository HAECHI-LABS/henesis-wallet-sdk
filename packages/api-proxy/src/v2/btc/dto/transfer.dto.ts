import { BtcTransactionDTO } from "./btc-transaction.dto";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/btc/transfers";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";

export class TransferDTO {
  /**
   * 해당 전송(Transfer)이 포함되는 온체인 트랜잭션의 정보
   * @example BtcTransaction
   */
  transaction: BtcTransactionDTO;

  /**
   * 지갑 ID
   * @example 2d855c98bd183d14f7d9a1805327afff
   */
  walletId: string;

  /**
   * 전송할 암호화폐의 양 (단위: satoshi) (형식: 16진법)
   * @example 0x1
   */
  amount: string;

  /**
   * 전송(Transfer) 상태
   * @example PENDING, PENDING_APPROVAL
   */
  status: string;

  /**
   * 전송(Transfer) ID
   * @example 7074aaec177f02559e1b1c9e63816359
   */
  id: string;

  /**
   * 해당 전송(Transfer)을 통해 발생한 Output이 같은 트랜잭션에 포함된 여러 UTXO 중에 몇 번째 Output인지?
   * @example 0
   */
  outputIndex?: number;

  /**
   * 받는 주소
   * @example 2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm
   */
  receivedAt?: string;

  /**
   * 보내는 주소
   * @example 2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm
   */
  sendTo?: string;

  /**
   * 출금 한도를 초과할 경우 생성된 출금 요청의 ID
   * @example 7074aaec177f02559e1b1c9e63816359
   */
  withdrawalApprovalId?: string;

  /**
   * 전송(Transfer) 타입
   * @example WITHDRAWAL, DEPOSIT
   */
  type: string;

  /**
   * 전송(Transfer)이 생성된 시간 (형식: ms, UNIX time)
   * @example 1620042252520
   */
  createdAt: string;

  /**
   * 전송(Transfer) 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)
   * @example 1620042252520
   */
  updatedAt: string;

  /**
   * 사용된 수수료의 양 (단위: satoshi) (형식: 16진법)
   * @example 0x2ee
   */
  feeAmount?: string;

  /**
   * 지갑 ID
   * @example 0x0
   */
  confirmation: string;

  static fromTransfer(transfer: Transfer): TransferDTO {
    return {
      id: transfer.id,
      walletId: transfer.walletId,
      amount: transfer.amount
        ? BNConverter.bnToHexString(transfer.amount)
        : null,
      status: transfer.status,
      outputIndex: transfer.outputIndex,
      transaction: transfer.transaction
        ? BtcTransactionDTO.fromBTCTransaction(transfer.transaction)
        : null,
      receivedAt: transfer.receivedAt,
      sendTo: transfer.sendTo,
      withdrawalApprovalId: transfer.withdrawalApprovalId,
      type: transfer.type,
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
      feeAmount: transfer.feeAmount
        ? BNConverter.bnToHexString(transfer.feeAmount)
        : null,
      confirmation: transfer.confirmation
        ? BNConverter.bnToHexString(transfer.confirmation)
        : null,
    } as TransferDTO;
  }
}
