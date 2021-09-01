import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class CreateDepositAddressRequestDTO {
  @ApiModelProperty({
    description: "입금 주소 이름",
    example: "bch-depositAddress",
  })
  name: string;
}
