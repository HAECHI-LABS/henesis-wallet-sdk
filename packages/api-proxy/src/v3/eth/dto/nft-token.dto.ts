import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";

export const EXAMPLE_ETHEREUM_NFT_TOKEN_DTO: NftTokenDTO = {
  name: "Haechi 1st NFT",
  onchainId: "1",
  uri: "https://opensea-creatures-api.herokuapp.com/api/creature/3",
  externalUrl: "https://openseacreatures.io/3",
  imageUrl:
    "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  metadata: {
    description:
      "Friendly OpenSea Creature that enjoys long swims in the ocean.",
    external_url: "https://openseacreatures.io/3",
    image:
      "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
    name: "Dave Starbelly",
    attributes: [
      {
        trait_type: "Base",
        value: "Starfish",
      },
      {
        trait_type: "Eyes",
        value: "Big",
      },
    ],
  },
};

export class NftTokenDTO {
  @ApiModelProperty({
    description: "NFT 토큰의 이름",
    example: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "NFT 토큰의 온체인 ID",
    example: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO.onchainId,
  })
  onchainId: string;

  @ApiModelProperty({
    description: "NFT 토큰의 URI",
    example: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO.uri,
  })
  uri: string;

  @ApiModelProperty({
    description: "NFT 토큰 메타데이터 중 하나인 외부 주소",
    example: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO.externalUrl,
  })
  externalUrl: string;

  @ApiModelProperty({
    description: "NFT 토큰의 이미지 주소",
    example: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO.imageUrl,
  })
  imageUrl: string;

  @ApiModelProperty({
    description: "NFT 토큰의 메타데이터",
    example: EXAMPLE_ETHEREUM_NFT_TOKEN_DTO.metadata,
  })
  metadata: object;
}
