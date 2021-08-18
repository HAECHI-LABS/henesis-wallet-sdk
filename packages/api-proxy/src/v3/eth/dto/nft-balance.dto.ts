import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { EXAMPLE_ETHEREUM_NFT_DTO, NftDTO } from "./nft.dto";
import { NftBalance } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";

export const EXAMPLE_ETHEREUM_NFT_BALANCE_DTO: NftBalanceDTO = {
  nft: EXAMPLE_ETHEREUM_NFT_DTO,
  tokenOnchainId: "PR",
  tokenUri: "PR",
  tokenMetadata: {},
};

export class NftBalanceDTO {
  @ApiModelProperty({
    description: "NFT 컨트랙트",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.nft,
  })
  nft: NftDTO;

  @ApiModelProperty({
    description: "토큰의 ID",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.tokenOnchainId,
  })
  tokenOnchainId: string;

  @ApiModelProperty({
    description: "토큰의 Uri",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.tokenUri,
  })
  tokenUri: string;

  @ApiModelProperty({
    description: "토큰에 정의된 metadata",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.tokenMetadata,
  })
  tokenMetadata: object;

  static fromNftBalance(nftBalance: NftBalance): NftBalanceDTO {
    return {
      nft: nftBalance.nft,
      tokenOnchainId: nftBalance.token.onchainId,
      tokenUri: nftBalance.token.uri,
      tokenMetadata: nftBalance.token.metadata,
    };
  }
}
