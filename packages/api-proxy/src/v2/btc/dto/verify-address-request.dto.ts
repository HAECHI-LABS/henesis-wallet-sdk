import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class VerifyAddressRequestDTO {
  @ApiModelProperty({
    description: "받을 주소",
    example: "2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm",
  })
  address: string;
}
