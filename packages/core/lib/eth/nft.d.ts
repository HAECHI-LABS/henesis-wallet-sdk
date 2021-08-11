import { NftDTO } from "../__generate__/eth";
import { Contract } from "web3-eth-contract";
export declare type NftData = NftDTO;
export declare class Nft {
    protected nftData: NftData;
    protected readonly walletContract: Contract;
    constructor(nftData: NftData);
    getName(): string;
    getAddress(): string;
}
