import { TransactionDto, EXAMPLE_TRANSACTION_DTO } from "./transaction.dto";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/ltc/transfers";
import { BNConverter } from "@haechi-labs/henesis-wallet-core";
import {
  TransferStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/ltc";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_TRANSFER_DTO: TransferDTO = {
  transaction: EXAMPLE_TRANSACTION_DTO,
  walletId: "2d855c98bd183d14f7d9a1805327afff",
  amount: "1",
  status: TransferStatus.PENDING,
  id: "7074aaec177f02559e1b1c9e63816359",
  outputIndex: 0,
  receivedAt: "QS9mDWR42bcNK5CiWe2nU5PAM6vMzdi6fV",
  sendTo: "QS9mDWR42bcNK5CiWe2nU5PAM6vMzdi6fV",
  withdrawalApprovalId: "7074aaec177f02559e1b1c9e63816359",
  type: TransferType.WITHDRAWAL,
  createdAt: "1620042252520",
  updatedAt: "1620042252520",
  feeAmount: "750",
  confirmation: "35387",
  metadata: "metadata",
};

export class TransferDTO {
  @ApiModelPropertyOptional({
    description: "해당 전송(Transfer)이 포함되는 온체인 트랜잭션의 정보",
    example: EXAMPLE_TRANSFER_DTO.transaction,
  })
  transaction?: TransactionDto;

  @ApiModelProperty({
    description: "지갑 ID",
    example: EXAMPLE_TRANSFER_DTO.walletId,
  })
  walletId: string;

  @ApiModelProperty({
    description: "전송할 암호화폐의 양 (단위: litoshi) (형식: 10진법)",
    example: EXAMPLE_TRANSFER_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "전송(Transfer) 상태",
    example: EXAMPLE_TRANSFER_DTO.status,
  })
  status: TransferStatus;

  @ApiModelProperty({
    description: "전송(Transfer) ID",
    example: EXAMPLE_TRANSFER_DTO.id,
  })
  id: string;

  @ApiModelPropertyOptional({
    description:
      "해당 전송(Transfer)을 통해 발생한 Output이 같은 트랜잭션에 포함된 여러 UTXO 중에 몇 번째 Output 인지?",
    example: EXAMPLE_TRANSFER_DTO.outputIndex,
  })
  outputIndex?: number;

  @ApiModelPropertyOptional({
    description: "받는 주소",
    example: EXAMPLE_TRANSFER_DTO.receivedAt,
  })
  receivedAt?: string;

  @ApiModelPropertyOptional({
    description: "보내는 주소",
    example: EXAMPLE_TRANSFER_DTO.sendTo,
  })
  sendTo?: string;

  @ApiModelProperty({
    description: "출금 한도를 초과할 경우 생성된 출금 요청의 ID",
    example: EXAMPLE_TRANSFER_DTO.withdrawalApprovalId,
  })
  withdrawalApprovalId?: string;

  @ApiModelProperty({
    description: "전송(Transfer) 타입",
    example: EXAMPLE_TRANSFER_DTO.type,
  })
  type: TransferType;

  @ApiModelProperty({
    description: "전송(Transfer)이 생성된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_TRANSFER_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description:
      "전송(Transfer) 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_TRANSFER_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelPropertyOptional({
    description: "사용된 수수료의 양 (단위: litoshi) (형식: 10진법)",
    example: EXAMPLE_TRANSFER_DTO.feeAmount,
  })
  feeAmount?: string;

  @ApiModelProperty({
    description: "트랜잭션 전파 이후 채굴 된 블록 갯수",
    example: EXAMPLE_TRANSFER_DTO.confirmation,
  })
  confirmation: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: EXAMPLE_TRANSFER_DTO.metadata,
  })
  metadata?: string;

  static fromTransfer(transfer: Transfer): TransferDTO {
    return {
      id: transfer.id,
      walletId: transfer.walletId,
      amount: transfer.amount
        ? BNConverter.bnToDecimalString(transfer.amount)
        : null,
      status: transfer.status,
      outputIndex: transfer.outputIndex,
      transaction: transfer.transaction
        ? TransactionDto.fromTransaction(transfer.transaction)
        : null,
      receivedAt: transfer.receivedAt,
      sendTo: transfer.sendTo,
      withdrawalApprovalId: transfer.withdrawalApprovalId,
      type: transfer.type,
      createdAt: transfer.createdAt,
      updatedAt: transfer.updatedAt,
      feeAmount: transfer.feeAmount
        ? BNConverter.bnToDecimalString(transfer.feeAmount)
        : null,
      confirmation: transfer.confirmation
        ? BNConverter.bnToDecimalString(transfer.confirmation)
        : null,
      metadata: transfer.metadata,
    } as TransferDTO;
  }
}
