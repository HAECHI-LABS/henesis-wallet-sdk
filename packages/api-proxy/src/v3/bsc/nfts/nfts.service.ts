import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { NftDTO } from "../../eth/dto/nft.dto";
import { SyncMetadataRequestDTO } from "../../eth/nfts/dto/sync-metadata-request.dto";

@Injectable()
export class NftsService {
  async getNfts(sdk: SDK): Promise<NftDTO[]> {
    return (await sdk.bsc.nfts.getAllNfts()).map((nft) => NftDTO.fromNft(nft));
  }

  async syncMetadata(
    sdk: SDK,
    nftId: number,
    request: SyncMetadataRequestDTO
  ): Promise<void> {
    await sdk.bsc.nfts.syncMetadata(nftId, request.tokenOnchainId);
  }
}
