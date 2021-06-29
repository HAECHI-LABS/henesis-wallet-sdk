import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_FLUSH_TARGET_DTO: Target = {
  coinId: "11",
  depositAddressId: "c2bd6506cb56a6baaff32653ac77ef49",
};

export const EXAMPLE_CREATE_FLUSH_REQUEST_DTO: CreateFlushRequestDTO = {
  targets: [EXAMPLE_FLUSH_TARGET_DTO],
  gasPrice: "8000000000",
  gasLimit: "10000000000",
  metadata: "metadata",
};

class Target {
  @ApiModelProperty({
    description: "Henesis에서 부여한 Coin의 ID",
    example: EXAMPLE_FLUSH_TARGET_DTO.coinId,
  })
  coinId: string;

  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_FLUSH_TARGET_DTO.coinId,
  })
  depositAddressId: string;
}

export class CreateFlushRequestDTO {
  @ApiModelProperty({
    description: "집금할 대상의 목록",
    example: EXAMPLE_CREATE_FLUSH_REQUEST_DTO.targets,
  })
  targets: Target[];

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_CREATE_FLUSH_REQUEST_DTO.gasPrice,
  })
  gasPrice: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas limit null일 경우, Henesis가 자동으로 설정합니다.",
    example: EXAMPLE_CREATE_FLUSH_REQUEST_DTO.gasLimit,
  })
  gasLimit: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
