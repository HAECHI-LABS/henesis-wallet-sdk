import {
  EventStatus,
  TransferType,
} from "@haechi-labs/henesis-wallet-core/lib/__generate__/eth";
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { EXAMPLE_ETHEREUM_NFT_DTO, NftDTO } from "./nft.dto";
import { EXAMPLE_ETHEREUM_NFT_TOKEN_DTO, NftTokenDTO } from "./nft-token.dto";
import { NftTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";

export const EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO: NftTransferDTO = {
  id: 375031,
  from: "0x1f10ecbd971eab345ea19e96dc237b1fbd63de96",
  to: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
  status: EventStatus.CONFIRMED,
  orgId: "31cafc79bd437e1b8e7b8209e399d3f3",
  walletId: "ae40b1b3dd953e5592c21e58be30d807",
  depositAddressId: "ae40b1b3dd953e5592c21e58be30d807",
  nft: EXAMPLE_ETHEREUM_NFT_DTO,
  token: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO,
  transferType: TransferType.WITHDRAWAL,
  transactionId: "8c87c578d7568edc156f831cf03c3ff0",
  transactionHash:
    "0xef76a243fa224f723922a1b067dd916fb1b2568aff292d2d1d183a807804922f",
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
  name: "ETH 실비 정산",
  metadata: "metadata",
};

export const EXAMPLE_KLAYTN_NFT_TRANSFER_DTO: NftTransferDTO = {
  id: 375031,
  from: "0x1f10ecbd971eab345ea19e96dc237b1fbd63de96",
  to: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
  status: EventStatus.CONFIRMED,
  orgId: "31cafc79bd437e1b8e7b8209e399d3f3",
  walletId: "ae40b1b3dd953e5592c21e58be30d807",
  depositAddressId: "ae40b1b3dd953e5592c21e58be30d807",
  nft: EXAMPLE_ETHEREUM_NFT_DTO,
  token: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO,
  transferType: TransferType.WITHDRAWAL,
  transactionId: "8c87c578d7568edc156f831cf03c3ff0",
  transactionHash:
    "0xef76a243fa224f723922a1b067dd916fb1b2568aff292d2d1d183a807804922f",
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
  name: "KLAY 실비 정산",
  metadata: "metadata",
};

export const EXAMPLE_BINANCE_SMART_CHAIN_NFT_TRANSFER_DTO: NftTransferDTO = {
  id: 375031,
  from: "0x1f10ecbd971eab345ea19e96dc237b1fbd63de96",
  to: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
  status: EventStatus.CONFIRMED,
  orgId: "31cafc79bd437e1b8e7b8209e399d3f3",
  walletId: "ae40b1b3dd953e5592c21e58be30d807",
  depositAddressId: "ae40b1b3dd953e5592c21e58be30d807",
  nft: EXAMPLE_ETHEREUM_NFT_DTO,
  token: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO,
  transferType: TransferType.WITHDRAWAL,
  transactionId: "8c87c578d7568edc156f831cf03c3ff0",
  transactionHash:
    "0xef76a243fa224f723922a1b067dd916fb1b2568aff292d2d1d183a807804922f",
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
  name: "BNB 실비 정산",
  metadata: "metadata",
};

export class NftTransferDTO {
  @ApiModelProperty({
    description: "NFT 입출금 내역의 ID",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.id,
  })
  id: number;

  @ApiModelProperty({
    description: "출금 주소",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO["from"],
  })
  "from": string;

  @ApiModelProperty({
    description: "입금 주소",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "트랜잭션 상태",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.status,
  })
  status: EventStatus;

  @ApiModelProperty({
    description: "지갑이 속한 팀(Organization)의 ID",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.orgId,
  })
  orgId: string;

  @ApiModelProperty({
    description: "입출금 지갑 ID",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.walletId,
  })
  walletId: string;

  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.depositAddressId,
  })
  depositAddressId: string;

  @ApiModelProperty({
    description: "NFT 정보",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.nft,
  })
  nft: NftDTO;

  @ApiModelProperty({
    description: "NFT 토큰 정보",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.token,
  })
  token: NftTokenDTO;

  @ApiModelProperty({
    description: "입출금 타입",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.transferType,
  })
  transferType: TransferType;

  @ApiModelProperty({
    description:
      "트랜잭션 ID (Henesis Wallet에서 부여하는 트랜잭션의 고유 ID입니다. 온체인상 트랜잭션 해시와 다른 개념입니다.)",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.transactionId,
  })
  transactionId: string;

  @ApiModelProperty({
    description: "트랜잭션 해시",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.transactionHash,
  })
  transactionHash: string;

  @ApiModelProperty({
    description: "트랜잭션 생성 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "트랜잭션 상태가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.updatedAt,
  })
  updatedAt: string;

  @ApiModelProperty({
    description: "해당 내역의 지갑 또는 입금 주소의 이름",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.name,
  })
  name: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: EXAMPLE_ETHEREUM_NFT_TRANSFER_DTO.metadata,
  })
  metadata?: string;

  static fromNftTransferEvent(event: NftTransferEvent): NftTransferDTO {
    return {
      id: event.id,
      from: event.from,
      to: event.to,
      status: event.status,
      orgId: event.orgId,
      walletId: event.masterWalletId,
      nft: event.nft,
      token: event.token,
      depositAddressId:
        event.masterWalletId == event.walletId ? null : event.walletId,
      transferType: event.transferType,
      transactionId: event.transactionId,
      transactionHash: event.transactionHash,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      name: event.walletName,
      metadata: event.metadata,
    } as NftTransferDTO;
  }
}
