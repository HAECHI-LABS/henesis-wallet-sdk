import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { NftDTO } from "../dto/nft.dto";
import { SyncMetadataRequestDTO } from "./dto/sync-metadata-request.dto";

@Injectable()
export class NftsService {
  async getNfts(sdk: SDK): Promise<NftDTO[]> {
    return (await sdk.eth.nfts.getAllNfts()).map((nft) => NftDTO.fromNft(nft));
  }

  async syncMetadata(
    sdk: SDK,
    nftId: number,
    request: SyncMetadataRequestDTO
  ): Promise<void> {
    await sdk.eth.nfts.syncMetadata(nftId, request.tokenOnchainId);
  }
}
