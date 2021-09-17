import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export class TransferRequestDTO {
  @ApiModelProperty({
    description: "받을 주소",
    example: "bitcoincash:qz9ew4c9l7rt0rqv6ced08k0wts6vxwuqvvuuv2szl",
  })
  to: string;

  @ApiModelProperty({
    description: "보낼 금액 (단위: satoshi) (10진법)",
    example: "15",
  })
  amount: string;

  @ApiModelProperty({
    description: "비밀번호",
    example: "passphrase",
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description: "트랜잭션 byte당 지불할 fee 가격 (단위: satoshi) (10진범)",
    example: "219",
  })
  feeRate?: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
