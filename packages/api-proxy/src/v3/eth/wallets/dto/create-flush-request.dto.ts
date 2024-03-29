import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_FLUSH_TARGET_DTO: Target = {
  coinId: 11,
  depositAddressId: "c2bd6506cb56a6baaff32653ac77ef49",
};

export const EXAMPLE_ETHEREUM_CREATE_FLUSH_REQUEST_DTO: CreateFlushRequestDTO =
  {
    targets: [EXAMPLE_ETHEREUM_FLUSH_TARGET_DTO],
    gasPrice: "8000000000",
    gasLimit: "10000000000",
    metadata: "metadata",
  };

export const EXAMPLE_ETHEREUM_NFT_FLUSH_TARGET_DTO: NftTarget = {
  nftId: 11,
  depositAddressId: "c2bd6506cb56a6baaff32653ac77ef49",
};

export const EXAMPLE_ETHEREUM_CREATE_NFT_FLUSH_REQUEST_DTO: CreateNftFlushRequestDTO =
  {
    targets: [EXAMPLE_ETHEREUM_NFT_FLUSH_TARGET_DTO],
    gasPrice: "8000000000",
    gasLimit: "10000000000",
    metadata: "metadata",
  };

class Target {
  @ApiModelProperty({
    description: "Henesis에서 부여한 Coin의 ID",
    example: EXAMPLE_ETHEREUM_FLUSH_TARGET_DTO.coinId,
  })
  coinId: number;

  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_ETHEREUM_FLUSH_TARGET_DTO.depositAddressId,
  })
  depositAddressId: string;
}

export class CreateFlushRequestDTO {
  @ApiModelProperty({
    description: "집금할 대상의 목록",
    example: EXAMPLE_ETHEREUM_CREATE_FLUSH_REQUEST_DTO.targets,
    isArray: true,
    type: Target,
  })
  targets: Target[];

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price 입니다. (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_ETHEREUM_CREATE_FLUSH_REQUEST_DTO.gasPrice,
  })
  gasPrice?: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas limit 입니다. null일 경우, Henesis가 자동으로 설정합니다.",
    example: EXAMPLE_ETHEREUM_CREATE_FLUSH_REQUEST_DTO.gasLimit,
  })
  gasLimit?: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}

class NftTarget {
  @ApiModelProperty({
    description: "집금하고자 하는 NFT 컨트랙트의 ID",
    example: EXAMPLE_ETHEREUM_NFT_FLUSH_TARGET_DTO.nftId,
  })
  nftId: number;

  @ApiModelProperty({
    description: "입금 주소 ID",
    example: EXAMPLE_ETHEREUM_FLUSH_TARGET_DTO.depositAddressId,
  })
  depositAddressId: string;
}

export class CreateNftFlushRequestDTO {
  @ApiModelProperty({
    description: "집금할 대상의 목록",
    example: EXAMPLE_ETHEREUM_CREATE_FLUSH_REQUEST_DTO.targets,
    isArray: true,
    type: NftTarget,
  })
  targets: NftTarget[];

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price 입니다. (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_ETHEREUM_CREATE_FLUSH_REQUEST_DTO.gasPrice,
  })
  gasPrice?: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas limit 입니다. null일 경우, Henesis가 자동으로 설정합니다.",
    example: EXAMPLE_ETHEREUM_CREATE_FLUSH_REQUEST_DTO.gasLimit,
  })
  gasLimit?: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: "metadata",
  })
  metadata?: string;
}
