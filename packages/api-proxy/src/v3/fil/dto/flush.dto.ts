import { FilFlush } from "@haechi-labs/henesis-wallet-core/lib/fil/wallet";
import { EXAMPLE_FILECOIN_TRANSFER_DTO, TransferDTO } from "./transfer.dto";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_FLUSH_DTO: FlushDTO = {
  id: "76f42bbea97c5e5fb6420ee29060ffc3",
  masterWalletId: "49e129bd5e1e67eddc5e317ed2e42b4c",
  transfers: [EXAMPLE_FILECOIN_TRANSFER_DTO],
  createdAt: "1612411568760",
  updatedAt: "1612411724023",
};

export class FlushDTO {
  @ApiModelProperty({
    description: "Henesis에서 부여한 집금 ID",
    example: EXAMPLE_FILECOIN_FLUSH_DTO.id,
  })
  id: string;

  @ApiModelProperty({
    description: "집금한 마스터 지갑 ID",
    example: EXAMPLE_FILECOIN_FLUSH_DTO.masterWalletId,
  })
  masterWalletId: string;

  @ApiModelProperty({
    description: "집금을 통해 발생한 입출금 목록",
    example: EXAMPLE_FILECOIN_FLUSH_DTO.transfers,
  })
  transfers: TransferDTO[];

  @ApiModelProperty({
    description: "집금 발생 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_FLUSH_DTO.createdAt,
  })
  createdAt: string;

  @ApiModelProperty({
    description: "집금 정보가 마지막으로 변경된 시간 (형식: ms, UNIX time)",
    example: EXAMPLE_FILECOIN_FLUSH_DTO.updatedAt,
  })
  updatedAt: string;

  static fromFlush(flush: FilFlush) {
    return {
      id: flush.id,
      masterWalletId: flush.masterWalletId,
      transfers: flush.transfers.map(TransferDTO.fromTransfer),
      createdAt: flush.createdAt,
      updatedAt: flush.updatedAt,
    };
  }
}
