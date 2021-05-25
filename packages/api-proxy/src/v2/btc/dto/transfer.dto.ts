import { BtcTransactionDTO, EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO } from './btc-transaction.dto';
import { Transfer } from '@haechi-labs/henesis-wallet-core/lib/btc/transfers';
import { BNConverter } from '@haechi-labs/henesis-wallet-core';
import { TransferStatus, TransferType } from '@haechi-labs/henesis-wallet-core/lib/__generate__/btc';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export const EXAMPLE_BITCOIN_TRANSFER_DTO: TransferDTO = {
  transaction: EXAMPLE_BITCOIN_BTC_TRANSACTION_DTO,
  walletId: "2d855c98bd183d14f7d9a1805327afff",
  amount: "0x1",
  status: TransferStatus.PENDING,
  id: "7074aaec177f02559e1b1c9e63816359",
  outputIndex: 0,
  receivedAt: "2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm",
  sendTo: "2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm",
  withdrawalApprovalId: "7074aaec177f02559e1b1c9e63816359",
  type: TransferType.WITHDRAWAL,
  createdAt: "1620042252520",
  updatedAt: "1620042252520",
  feeAmount: "0x2ee",
  confirmation: "0x8a3b"
}

export class TransferDTO {
  @ApiModelProperty({
    description: "해당 전송(Transfer)이 포함되는 온체인 트랜잭션의 정보",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.transaction
  })
  transaction: BtcTransactionDTO;

  @ApiModelProperty({
    description: "지갑 ID",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.walletId
  })
  walletId: string;

  @ApiModelProperty({
    description: "전송할 암호화폐의 양 (단위: satoshi) (형식: 16진법)",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.amount
  })
  amount: string;

  @ApiModelProperty({
    description: "전송(Transfer) 상태",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.status
  })
  status: TransferStatus;

  @ApiModelProperty({
    description: "전송(Transfer) ID",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.id
  })
  id: string;

  @ApiModelProperty({
    description: "해당 전송(Transfer)을 통해 발생한 Output이 같은 트랜잭션에 포함된 여러 UTXO 중에 몇 번째 Output 인지?",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.outputIndex
  })
  outputIndex?: number;

  @ApiModelProperty({
    description: "받는 주소",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.receivedAt
  })
  receivedAt?: string;

  @ApiModelProperty({
    description: "보내는 주소",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.sendTo
  })
  sendTo?: string;

  @ApiModelProperty({
    description: "출금 한도를 초과할 경우 생성된 출금 요청의 ID",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.withdrawalApprovalId
  })
  withdrawalApprovalId?: string;

  @ApiModelProperty({
    description: "전송(Transfer) 타입",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.type
  })
  type: TransferType;

  @ApiModelProperty({
    description: "전송(Transfer)이 생성된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.createdAt
  })
  createdAt: string;

  @ApiModelProperty({
    description: "전송(Transfer) 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.updatedAt
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "사용된 수수료의 양 (단위: satoshi) (형식: 16진법)",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.feeAmount
  })
  feeAmount?: string;

  @ApiModelProperty({
    description: "트랜잭션 전파 이후 채굴 된 블록 갯수",
    example: EXAMPLE_BITCOIN_TRANSFER_DTO.confirmation
  })
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
