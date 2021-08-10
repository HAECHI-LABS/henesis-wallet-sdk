import { Client } from "../httpClient";
import { Nft, NftData } from "./nft";
import { NftItemDTO } from "../__generate__/eth";

export type NftItem = NftItemDTO;

export class Nfts {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getAllNfts(): Promise<Nft[]> {
    const nftDataList = await this.client.get<NftData[]>(`/nfts`);
    return nftDataList.map((nftData) => new Nft(nftData));
  }

  async getNft(nftId: number): Promise<Nft> {
    const nftData = await this.client.get<NftData>(`/nfts/${nftId}`);
    return new Nft(nftData);
  }

  async syncMetadata(nftId: number, tokenOnchainId: string): Promise<NftItem> {
    const syncedNftItem = await this.client.post<NftItemDTO>(
      `/nfts/${nftId}/sync-metadata`,
      {
        tokenOnchainId: tokenOnchainId,
      }
    );
    return syncedNftItem as NftItem;
  }
}
