import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import {
  BNConverter,
  RawTransaction,
  SignedMultiSigPayload,
  Transaction,
  TransactionStatus,
} from "@haechi-labs/henesis-wallet-core";

export class TransactionDTO {
  /**
   * 트랜잭션 ID
   * @example 2def027e99e906f8b912c691def10861
   */

  id?: string;

  /**
   * 블록체인 플랫폼
   * @example ETHEREUM
   */

  blockchain?: BlockchainType;

  /**
   * Henesis Key의 주소
   * @example 0x4ef3ba60c8710f45371835cddafabf33daa83e1d
   */

  sender: string;

  /**
   * 트랜잭션을 발생시킨 Henesis Key의 ID
   * @example 52e779750bb1330d2f23439c6da821ee
   */

  keyId: string;

  /**
   * 트랜잭션 해시
   * @example 0xb53d099ca4ad755f3c66f0d64057eae26420d946241685a6745e2f09bc81cf7e
   */

  hash?: string;

  /**
   * 트랜잭션 전송 시 발생한 에러
   * @example null
   */

  error?: string;

  /**
   * 트랜잭션 상태
   * @example CONFIRMED
   */

  status: TransactionStatus;

  /**
   * 트랜잭션 수수료 대납 여부
   * @example false
   */

  isFeeDelegated: boolean;

  /**
   * 트랜잭션 수수료 (형식: hex string)
   * @example 0x896da43e8000
   */

  fee?: string;

  /**
   * 트랜잭션 예상 수수료 (형식: hex string)
   * @example 0x8ac02d65cc00
   */

  estimatedFee?: string;

  /**
   * Account Key로 서명한 트랜잭션 Payload
   * @example SignedMultiSigPayload
   */

  signedMultiSigPayload?: SignedMultiSigPayload;

  /**
   * 블록체인에 전파된 트랜잭션
   * @example RawTransaction
   */

  rawTransaction?: RawTransaction;

  static fromTransaction(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      blockchain: transaction.blockchain,
      sender: transaction.sender,
      keyId: transaction.keyId,
      hash: transaction.hash,
      error: transaction.error,
      status: transaction.status,
      isFeeDelegated: transaction.isFeeDelegated,
      fee: transaction.fee ? BNConverter.bnToHexString(transaction.fee) : null,
      estimatedFee: transaction.estimatedFee
        ? BNConverter.bnToHexString(transaction.estimatedFee)
        : null,
      signedMultiSigPayload: transaction.signedMultiSigPayload,
      rawTransaction: transaction.rawTransaction,
    };
  }
}
