import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class ChangeWalletNameRequestDTO {
  @ApiModelProperty({
    description: "변경할 지갑 이름",
    example: "walletName",
  })
  name: string;
}
