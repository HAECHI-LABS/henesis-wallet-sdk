import {
  TransferStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/fil";
import {
  EXAMPLE_FILECOIN_TRANSACTION_DTO,
  TransactionDTO,
} from "./transaction.dto";
import { FilTransfer } from "@haechi-labs/henesis-wallet-core/lib/fil";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_TRANSFER_DTO: TransferDTO = {
  id: "5b0d5c94f8fa6c2a891eb4f833767f03",
  from: "t1tian42omo3lnk6lh7mw6k3d4muelbfvvlmhufni",
  to: "t2faaemofs4z3qnnpeawbrawyot43iuekkg52tjai",
  amount: "1000000000",
  status: TransferStatus.CONFIRMED,
  masterWalletId: "ae40b1b3dd953e5592c21e58be30d807",
  walletId: "3dd953e5592c21e58be30d807ae40b1b",
  type: TransferType.WITHDRAWAL,
  transaction: EXAMPLE_FILECOIN_TRANSACTION_DTO,
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
  metadata: "metadata",
};

export class TransferDTO {
  @ApiModelProperty({
    description: "입출금 내역의 ID",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "출금 주소",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.from,
  })
  from: string;

  @ApiModelProperty({
    description: "입금 주소",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "암호화폐(FIL)의 양 (단위: attoFIL)",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "출금 상태",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.status,
  })
  status: TransferStatus;

  @ApiModelProperty({
    description: "입출금 마스터 지갑 ID",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.masterWalletId,
  })
  masterWalletId: string;

  @ApiModelProperty({
    description: "입출금이 발생한 마스터 지갑 혹은 입금 주소 ID",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.walletId,
  })
  walletId: string;

  @ApiModelProperty({
    description: "입출금 타입",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.type,
  })
  type: TransferType;

  @ApiModelProperty({
    description: "입출금 트랜잭션",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.transaction,
  })
  transaction: TransactionDTO;

  @ApiModelProperty({
    description: "입출금 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "입출금 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: EXAMPLE_FILECOIN_TRANSFER_DTO.metadata,
  })
  metadata?: string;

  static fromTransfer(transfer: FilTransfer): TransferDTO {
    return {
      id: transfer.id,
      from: transfer.fromAddress,
      to: transfer.toAddress,
      amount: transfer.amount.toString(10),
      status: transfer.status,
      masterWalletId: transfer.masterWalletId,
      walletId: transfer.walletId,
      type: transfer.type,
      transaction: {
        id: transfer.transaction.id,
        hash: transfer.transaction.hash,
      },
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
      metadata: transfer.metadata,
    };
  }
}
