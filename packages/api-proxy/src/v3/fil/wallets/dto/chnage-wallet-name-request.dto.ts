import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class ChangeWalletNameRequestDTO {
  @ApiModelProperty({
    description: "지갑의 새로운 이름",
    example: "name",
  })
  name: string;
}
