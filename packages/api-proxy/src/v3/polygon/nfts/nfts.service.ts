import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { NftDTO } from "../../eth/dto/nft.dto";
import { SyncMetadataRequestDTO } from "../../eth/nfts/dto/sync-metadata-request.dto";

@Injectable()
export class NftsService {
  async getNfts(sdk: SDK): Promise<NftDTO[]> {
    return (await sdk.polygon.nfts.getAllNfts()).map((nft) =>
      NftDTO.fromNft(nft)
    );
  }

  async getNft(sdk: SDK, nftId: number): Promise<NftDTO> {
    return NftDTO.fromNft(await sdk.polygon.nfts.getNft(nftId));
  }

  async syncMetadata(
    sdk: SDK,
    nftId: number,
    request: SyncMetadataRequestDTO
  ): Promise<void> {
    await sdk.polygon.nfts.syncMetadata(nftId, request.tokenOnchainId);
  }
}
