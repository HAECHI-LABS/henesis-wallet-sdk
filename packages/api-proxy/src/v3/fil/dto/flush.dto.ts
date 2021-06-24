import { FilFlush } from "@haechi-labs/henesis-wallet-core/lib/fil/wallet";
import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FILECOIN_FLUSH_DTO: FlushDTO = {
  id: "76f42bbea97c5e5fb6420ee29060ffc3",
  walletId: "49e129bd5e1e67eddc5e317ed2e42b4c",
  transfers: [
    "5fb553df526af04600fd9d98ac52fbe0",
    "87659d2ce60a5a13cd3d92403d187219",
  ],
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
    description: "집금한 지갑 ID",
    example: EXAMPLE_FILECOIN_FLUSH_DTO.walletId,
  })
  walletId: string;

  @ApiModelProperty({
    description: "집금을 통해 발생한 입출금의 ID 목록",
    example: EXAMPLE_FILECOIN_FLUSH_DTO.transfers,
  })
  transfers: string[];

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
      walletId: flush.walletId,
      transfers: flush.transfers.map((transfer) => {
        return transfer.id;
      }),
      createdAt: flush.createdAt,
      updatedAt: flush.updatedAt,
    };
  }
}
