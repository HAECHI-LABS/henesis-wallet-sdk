import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import {
  BNConverter,
  Transaction,
  TransactionStatus,
} from "@haechi-labs/henesis-wallet-core";

interface MultiSigPayloadDTO {
  walletAddress: string;
  toAddress: string;
  value: string;
  walletNonce: string;
  hexData?: string;
}

interface SignedMultiSigPayloadDTO {
  signature: string;
  multiSigPayload: MultiSigPayloadDTO | null;
}

interface RawTransactionDTO {
  nonce: string;
  gasPrice: string;
  gasLimit: string;
  to?: string;
  value: string;
  data?: string;
}

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
  signedMultiSigPayload?: SignedMultiSigPayloadDTO;

  /**
   * 블록체인에 전파된 트랜잭션
   * @example RawTransaction
   */
  rawTransaction?: RawTransactionDTO;

  /**
   * 트랜잭션 생성 시간 (형식: ms, UNIX time)
   * @example 1614582928222
   */
  createdAt: string;

  /**
   * 트랜잭션 상태가 변한 시간 (형식: ms, UNIX time)
   * @example 1612411724023
   */
  updatedAt: string;

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
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      fee: transaction.fee ? BNConverter.bnToHexString(transaction.fee) : null,
      estimatedFee: transaction.estimatedFee
        ? BNConverter.bnToHexString(transaction.estimatedFee)
        : null,
      signedMultiSigPayload: transaction.signedMultiSigPayload
        ? {
            signature: transaction.signedMultiSigPayload.signature,
            multiSigPayload: transaction.signedMultiSigPayload.multiSigPayload
              ? {
                  walletAddress:
                    transaction.signedMultiSigPayload.multiSigPayload
                      .walletAddress,
                  toAddress:
                    transaction.signedMultiSigPayload.multiSigPayload.toAddress,
                  value: BNConverter.bnToHexString(
                    transaction.signedMultiSigPayload.multiSigPayload.value
                  ),
                  walletNonce: BNConverter.bnToHexString(
                    transaction.signedMultiSigPayload.multiSigPayload
                      .walletNonce
                  ),
                  hexData:
                    transaction.signedMultiSigPayload.multiSigPayload.hexData,
                }
              : null,
          }
        : null,
      rawTransaction: transaction.rawTransaction
        ? {
            nonce: BNConverter.bnToHexString(transaction.rawTransaction.nonce),
            gasPrice: BNConverter.bnToHexString(
              transaction.rawTransaction.gasPrice
            ),
            gasLimit: BNConverter.bnToHexString(
              transaction.rawTransaction.gasLimit
            ),
            to: transaction.rawTransaction.to,
            value: BNConverter.bnToHexString(transaction.rawTransaction.value),
            data: transaction.rawTransaction.data,
          }
        : null,
    };
  }
}
