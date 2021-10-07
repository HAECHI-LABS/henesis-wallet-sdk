import { Transaction } from "@haechi-labs/henesis-wallet-core";
import { EthTransaction } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";
import { BlockchainType } from "@haechi-labs/henesis-wallet-core/lib/blockchain";
import { TransactionStatus } from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_TRANSACTION_DTO: TransactionDTO = {
  id: "b549bfaaa74d1c4244ecc655738b1984",
  blockchain: BlockchainType.ETHEREUM,
  hash: "0x8a1ef722a2884d53a86874c8ba19bcf267bb0b8a81da00c14ddc6457cf1eaf96",
  error: "null",
  status: TransactionStatus.CONFIRMED,
  fee: "10000000",
  hopAddress: "0x1AA2705a26452cC22430F31A5c85974bBEDDe5a5",
  createdAt: "1614582928222",
  updatedAt: "1612411724023",
};

export class TransactionDTO {
  @ApiModelProperty({
    description:
      "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다, 블록체인에서 부여하는 트랜잭션 해시와 다른 개념입니다)",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "메인넷 종류",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.blockchain,
  })
  blockchain: BlockchainType;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션 해시 (트랜잭션 상태가 REQUESTED일 때는 존재하지 않습니다)",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.hash,
  })
  hash?: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션 전송 시 발생한 에러",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.error,
  })
  error?: string;

  @ApiModelProperty({
    description: "트랜잭션 상태",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.status,
  })
  status: TransactionStatus;

  @ApiModelPropertyOptional({
    description: "트랜잭션 수수료",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.fee,
  })
  fee?: string;

  @ApiModelProperty({
    description: "홉 주소",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.hopAddress,
  })
  hopAddress?: string;

  @ApiModelProperty({
    description: "트랜잭션 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태가 변한 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_TRANSACTION_DTO.updatedAt,
  })
  updatedAt: string;

  static fromEthTransaction(transaction: EthTransaction): TransactionDTO {
    return {
      id: transaction.id,
      blockchain: transaction.blockchain,
      hash: transaction.hash,
      error: transaction.error,
      status: transaction.status,
      fee: transaction.fee, // todo: fix sdk! unify fee's type (string/BN)
      hopAddress: transaction.hopAddress,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }

  static fromTransaction(transaction: Transaction): TransactionDTO {
    return {
      id: transaction.id,
      blockchain: transaction.blockchain,
      hash: transaction.hash,
      error: transaction.error,
      status: transaction.status,
      fee: transaction.fee.toString(10), // todo: fix sdk! unify fee's type (string/BN)
      hopAddress: transaction.hopAddress,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }
}
