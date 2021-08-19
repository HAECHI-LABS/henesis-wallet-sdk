import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { Nft } from "@haechi-labs/henesis-wallet-core/lib/eth/nft";

export const EXAMPLE_ETHEREUM_NFT_DTO: NftDTO = {
  id: 11,
  name: "Dave Starbelly",
  symbol: "1",
  address: "0xdd00383e5a51166bba3e96d84c14a36d72e6c128",
};

export class NftDTO {
  @ApiModelProperty({
    description: "NFT 컨트랙트의 id",
    example: EXAMPLE_ETHEREUM_NFT_DTO.id,
  })
  id: number;

  @ApiModelProperty({
    description: "NFT 컨트랙트의 이름",
    example: EXAMPLE_ETHEREUM_NFT_DTO.name,
  })
  name: string;

  @ApiModelProperty({
    description: "NFT 컨트랙트의 심볼",
    example: EXAMPLE_ETHEREUM_NFT_DTO.name,
  })
  symbol: string;

  @ApiModelProperty({
    description: "NFT 컨트랙트의 주소",
    example: EXAMPLE_ETHEREUM_NFT_DTO.address,
  })
  address: string;

  static fromNft(nft: Nft): NftDTO {
    return {
      id: nft.getId(),
      name: nft.getName(),
      symbol: nft.getSymbol(),
      address: nft.getAddress(),
    };
  }
}
