import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class ChangeMasterWalletNameRequestDTO {
  @ApiModelProperty({
    description: "마스터 지갑의 새로운 이름",
    example: "masterWalletName",
    default: "masterWalletName",
  })
  name: string;
}
