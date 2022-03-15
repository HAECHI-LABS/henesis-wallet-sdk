import { ApiModelProperty } from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import { EXAMPLE_ETHEREUM_NFT_DTO, NftDTO } from "../../eth/dto/nft.dto";
import { NftBalance } from "@haechi-labs/henesis-wallet-core/lib/eth/abstractWallet";

export const EXAMPLE_ETHEREUM_NFT_BALANCE_DTO: NftBalanceDTO = {
  nft: EXAMPLE_ETHEREUM_NFT_DTO,
  tokenOnchainId: "1",
  tokenUri: "https://opensea-creatures-api.herokuapp.com/api/creature/3",
  tokenMetadata: {
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
  masterWalletId: "532d994e923817013aff23c6dc1ae766",
  userWalletId: "4daf51ef18e3a1ce1148b33a6a1b1589",
  isWithdrawalPending: false,
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
    description: "토큰의 URI",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.tokenUri,
  })
  tokenUri: string;

  @ApiModelProperty({
    description: "토큰에 정의된 metadata",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.tokenMetadata,
  })
  tokenMetadata: object;

  @ApiModelProperty({
    description: "마스터 지갑 id",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.masterWalletId,
  })
  masterWalletId: string;

  @ApiModelProperty({
    description: "유저 지갑 id",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.userWalletId,
  })
  userWalletId: string;

  @ApiModelProperty({
    description: "출금 중 여부",
    example: EXAMPLE_ETHEREUM_NFT_BALANCE_DTO.isWithdrawalPending,
  })
  isWithdrawalPending: boolean;

  static fromNftBalance(nftBalance: NftBalance): NftBalanceDTO {
    return {
      nft: nftBalance.nft,
      tokenOnchainId: nftBalance.token.onchainId,
      tokenUri: nftBalance.token.uri,
      tokenMetadata: nftBalance.token.metadata,
      masterWalletId: nftBalance.masterWalletId,
      userWalletId:
        nftBalance.masterWalletId != nftBalance.walletId
          ? nftBalance.walletId
          : null,
      isWithdrawalPending: nftBalance.isWithdrawalPending,
    };
  }
}
