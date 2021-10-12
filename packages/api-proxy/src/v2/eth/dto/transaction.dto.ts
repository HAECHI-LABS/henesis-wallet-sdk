import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import {
  BNConverter,
  Transaction,
  TransactionStatus,
} from "@haechi-labs/henesis-wallet-core";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { EXAMPLE_ETHEREUM_TRANSACTION_DTO } from "../../../v3/eth/dto/transaction.dto";

const EXAMPLE_ETH_KLAY_MULTI_SIG_PAYLOAD_DTO: MultiSigPayloadDTO = {
  walletAddress: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
  toAddress: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
  value: "0x1",
  walletNonce: "1",
  hexData: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
};

const EXAMPLE_ETH_KLAY_SIGNED_MULTI_SIG_PAYLOAD_DTO: SignedMultiSigPayloadDTO =
  {
    signature: "sig",
    multiSigPayload: EXAMPLE_ETH_KLAY_MULTI_SIG_PAYLOAD_DTO,
  };

const EXAMPLE_ETH_KLAY_RAW_TRANSACTION_DTO: RawTransactionDTO = {
  nonce: "1",
  gasPrice: "0x1",
  gasLimit: "0x1",
  to: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
  value: "0x1",
  data: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
};

export const EXAMPLE_ETH_KLAY_TRANSACTION_DTO: TransactionDTO = {
  id: "2def027e99e906f8b912c691def10861",
  blockchain: BlockchainType.ETHEREUM,
  sender: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
  keyId: "52e779750bb1330d2f23439c6da821ee",
  hash: "0xb53d099ca4ad755f3c66f0d64057eae26420d946241685a6745e2f09bc81cf7e",
  error: null,
  status: TransactionStatus.CONFIRMED,
  isFeeDelegated: false,
  fee: "0x896da43e8000",
  estimatedFee: "0x8ac02d65cc00",
  signedMultiSigPayload: EXAMPLE_ETH_KLAY_SIGNED_MULTI_SIG_PAYLOAD_DTO,
  rawTransaction: EXAMPLE_ETH_KLAY_RAW_TRANSACTION_DTO,
  hopAddress: "0x1AA2705a26452cC22430F31A5c85974bBEDDe5a5",
  createdAt: "1614582928222",
  updatedAt: "1612411724023",
};

interface MultiSigPayloadDTO {
  walletAddress: string;
  toAddress: string;
  value: string;
  walletNonce: string;
  hexData?: string;
}

interface SignedMultiSigPayloadDTO {
  signature: string;
  multiSigPayload?: MultiSigPayloadDTO | null;
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
  @ApiModelPropertyOptional({
    description: "트랜잭션 ID",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.id,
  })
  id?: string;

  @ApiModelPropertyOptional({
    description: "블록체인 플랫폼",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.blockchain,
  })
  blockchain?: BlockchainType;

  @ApiModelProperty({
    description: "Henesis Key의 주소",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.sender,
  })
  sender: string;

  @ApiModelProperty({
    description: "트랜잭션을 발생시킨 Henesis Key의 ID",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.keyId,
  })
  keyId: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션 해시",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.hash,
  })
  hash?: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션 전송 시 발생한 에러",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.error,
  })
  error?: string;

  @ApiModelProperty({
    description: "트랜잭션 상태",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.status,
  })
  status: TransactionStatus;

  @ApiModelProperty({
    description: "트랜잭션 수수료 대납 여부",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.isFeeDelegated,
  })
  isFeeDelegated: boolean;

  @ApiModelPropertyOptional({
    description: "트랜잭션 수수료 (형식: hex string)",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.fee,
  })
  fee?: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션 예상 수수료 (형식: hex string)",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.estimatedFee,
  })
  estimatedFee?: string;

  @ApiModelPropertyOptional({
    description: "Account Key로 서명한 트랜잭션 Payload",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.signedMultiSigPayload,
  })
  signedMultiSigPayload?: SignedMultiSigPayloadDTO;

  @ApiModelPropertyOptional({
    description: "블록체인에 전파된 트랜잭션",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.rawTransaction,
  })
  rawTransaction?: RawTransactionDTO;

  @ApiModelProperty({
    description: "홉 주소",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.hopAddress,
  })
  hopAddress?: string;

  @ApiModelProperty({
    description: "트랜잭션 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태가 변한 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETH_KLAY_TRANSACTION_DTO.updatedAt,
  })
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
      hopAddress: transaction.hopAddress,
    };
  }
}
