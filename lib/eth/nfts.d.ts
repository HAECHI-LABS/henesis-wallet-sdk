import { Client } from "../httpClient";
import { Nft } from "./nft";
import { NftItemDTO } from "../__generate__/eth";
export declare type NftItem = NftItemDTO;
export declare class Nfts {
    private readonly client;
    constructor(client: Client);
    getAllNfts(): Promise<Nft[]>;
    getNft(nftId: number): Promise<Nft>;
    syncMetadata(nftId: number, tokenOnchainId: string): Promise<NftItem>;
}
