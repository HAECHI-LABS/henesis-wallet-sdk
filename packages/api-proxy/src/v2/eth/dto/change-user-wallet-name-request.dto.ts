import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class ChangeUserWalletNameRequestDTO {
  @ApiModelProperty({
    description: "사용자 지갑의 새로운 이름",
    example: "userWalletName",
    default: "userWalletName",
  })
  name: string;
}
