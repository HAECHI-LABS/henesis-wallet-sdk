import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class TransferRequestDTO {
  @ApiModelProperty({
    description: "받을 주소",
    example: "2MsG2rSiQsGQJJAvvxdXkvsR25QJN9uAqqm",
  })
  to: string;

  @ApiModelProperty({
    description:
      "보낼 금액 (단위: satoshi) (16진법, 맨 앞에 반드시 '0x' 붙여야 함)",
    example: "0x12",
  })
  amount: string;

  @ApiModelProperty({
    description: "비밀번호",
    example: "passphrase",
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션 byte당 지불할 fee 가격 (단위: satoshi) (16진법, 맨 앞에 반드시 '0x' 붙여야 함) (v2.10.9 이상 지원)",
    example: "0xDB",
  })
  feeRate?: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
