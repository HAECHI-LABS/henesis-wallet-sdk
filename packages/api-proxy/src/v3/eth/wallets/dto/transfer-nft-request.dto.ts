import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO: TransferNftRequestDTO =
  {
    nftId: 1,
    to: "0xab28d146e860e0b132695c941f706d783a158345",
    tokenOnchainId: "3",
    passphrase: "passphrase",
    gasPrice: "8000000000",
    gasLimit: "500000",
    metadata: "metadata",
  };

export class TransferNftRequestDTO {
  @ApiModelProperty({
    description: "출금하고자 하는 NFT 컨트랙트의 ID",
    example: EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO.nftId,
  })
  nftId: number;

  @ApiModelProperty({
    description: "출금하고자 하는 토큰의 id",
    example: EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO.tokenOnchainId,
  })
  tokenOnchainId: string;

  @ApiModelProperty({
    description: "출금 목적 주소",
    example: EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO.to,
  })
  to: string;

  @ApiModelProperty({
    description: "지갑의 비밀번호",
    example: EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO.passphrase,
  })
  passphrase: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas price (단위: wei) null일 경우, Henesis가 자동으로 5분 안에 채굴될 수 있는 값으로 설정합니다.",
    example: EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO.gasPrice,
  })
  gasPrice?: string;

  @ApiModelPropertyOptional({
    description:
      "트랜잭션에 사용할 gas limit. null일 경우, Henesis가 자동으로 설정합니다.",
    example: EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO.gasLimit,
  })
  gasLimit?: string;

  @ApiModelPropertyOptional({
    description: "기타 정보 기록용 메타 데이터 (255자 제한)",
    example: EXAMPLE_ETHEREUM_TRANSFER_NFT_REQUEST_DTO.metadata,
  })
  metadata?: string;
}
