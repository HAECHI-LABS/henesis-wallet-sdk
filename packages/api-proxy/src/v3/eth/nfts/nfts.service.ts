import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { NftDTO } from "../dto/nft.dto";
import { SyncMetadataRequestDTO } from "./dto/sync-metadata-request.dto";

@Injectable()
export class NftsService {
  async getNfts(sdk: SDK): Promise<NftDTO[]> {
    const wallets = await sdk.eth.wallets.getWallets();
    const result = await Promise.all(
      wallets
        .filter((wallet) => wallet.getNfts())
        .map(async (wallet) => {
          return await wallet.getNfts().getAllNfts();
        })
    );
    return result
      .reduce((acc, cur) => acc.concat(cur), [])
      .map((nft) => NftDTO.fromNft(nft));
  }

  async syncMetadata(
    sdk: SDK,
    nftId: number,
    request: SyncMetadataRequestDTO
  ): Promise<void> {
    const wallets = await sdk.eth.wallets.getWallets();
    const result = await Promise.all(
      wallets
        .filter((wallet) => wallet.getNfts())
        .map(async (wallet) => {
          return {
            nfts: wallet.getNfts(),
            list: await wallet.getNfts().getAllNfts(),
          };
        })
    );
    const nfts = result.find(({ nfts, list }) =>
      list.find((nft) => nft.getId() === nftId)
    ).nfts;
    if (!nfts) throw new Error(`NFT id ${nftId} not found`);
    await nfts.syncMetadata(nftId, request.tokenOnchainId);
  }
}
