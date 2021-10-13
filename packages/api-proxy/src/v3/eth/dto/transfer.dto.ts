import { ValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_TRANSFER_DTO: TransferDTO = {
  id: 375031,
  from: "0x1f10ecbd971eab345ea19e96dc237b1fbd63de96",
  to: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
  amount: "1000000000",
  status: EventStatus.CONFIRMED,
  orgId: "31cafc79bd437e1b8e7b8209e399d3f3",
  decimals: 18,
  walletId: "ae40b1b3dd953e5592c21e58be30d807",
  depositAddressId: "ae40b1b3dd953e5592c21e58be30d807",
  ticker: "USDT",
  transferType: TransferType.WITHDRAWAL,
  transactionId: "8c87c578d7568edc156f831cf03c3ff0",
  transactionHash:
    "0xef76a243fa224f723922a1b067dd916fb1b2568aff292d2d1d183a807804922f",
  hopTransactionId: "6f831cf03c3ff08c87c578d7568edc15",
  hopTransactionHash:
    "0x60603c815f0ba0ad6b7f2ae398bd7cb9fe71347f984e32453fe4fe53f255dfd3",
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
  name: "ETH 실비 정산",
  metadata: "metadata",
};

export const EXAMPLE_BINANCE_SMART_CHAIN_TRANSFER_DTO: TransferDTO = {
  ...EXAMPLE_ETHEREUM_TRANSFER_DTO,
  name: "BSC 실비 정산",
};

export class TransferDTO {
  @ApiModelProperty({
    description: "코인/토큰 입출금 내역의 ID",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.id,
  })
  id: number;

  @ApiModelProperty({
    description: "출금 주소",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO["from"],
  })
  "from": string;

  @ApiModelProperty({
    description: "입금 주소",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "암호화폐의 양",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.amount,
  })
  amount: string;

  @ApiModelProperty({
    description: "트랜잭션 상태",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.status,
  })
  status: EventStatus;

  @ApiModelProperty({
    description: "지갑이 속한 팀(Organization)의 ID",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.orgId,
  })
  orgId: string;

  @ApiModelProperty({
    description: "암호화폐의 소수점 자릿수",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.decimals,
  })
  decimals: number;

  @ApiModelProperty({
    description: "입출금 지갑 ID",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.walletId,
  })
  walletId: string;

  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.depositAddressId,
  })
  depositAddressId: string;

  @ApiModelProperty({
    description: "암호화폐의 기호",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.ticker,
  })
  ticker: string;

  @ApiModelProperty({
    description: "입출금 타입",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.transferType,
  })
  transferType: TransferType;

  @ApiModelProperty({
    description:
      "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.transactionId,
  })
  transactionId: string;

  @ApiModelProperty({
    description: "트랜잭션 해시",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.transactionHash,
  })
  transactionHash: string;

  @ApiModelProperty({
    description:
      "홉 트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.hopTransactionId,
  })
  hopTransactionId: string;

  @ApiModelProperty({
    description: "홉 트랜잭션 해시",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.hopTransactionHash,
  })
  hopTransactionHash: string;

  @ApiModelProperty({
    description: "트랜잭션 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "해당 내역의 지갑 또는 입금 주소의 이름",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.name,
  })
  name: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: EXAMPLE_ETHEREUM_TRANSFER_DTO.metadata,
  })
  metadata?: string;

  static fromValueTransferEvent(event: ValueTransferEvent): TransferDTO {
    return {
      id: event.id,
      from: event.from,
      to: event.to,
      amount: event.amount.toString(10),
      status: event.status,
      orgId: event.orgId,
      decimals: event.decimals,
      walletId: event.masterWalletId,
      depositAddressId:
        event.masterWalletId == event.walletId ? null : event.walletId,
      ticker: event.coinSymbol,
      transferType: event.transferType,
      transactionId: event.transactionId,
      transactionHash: event.transactionHash,
      createdAt: event.createdAt,
      hopTransactionId: event.hopTransactionId,
      hopTransactionHash: event.hopTransactionHash,
      updatedAt: event.updatedAt,
      name: event.walletName,
      metadata: event.metadata,
    } as TransferDTO;
  }
}
