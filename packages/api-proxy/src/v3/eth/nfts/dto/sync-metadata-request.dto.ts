import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class SyncMetadataRequestDTO {
  @ApiModelProperty({
    description: "토큰의 ID",
    example: "id",
  })
  tokenOnchainId: string;
}
