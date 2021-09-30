import { NftDTO, NftTokenDTO } from "../__generate__/eth";
import { Contract } from "web3-eth-contract";
import { EthLikeWallet } from "./abstractWallet";
import { MultiSigPayload } from "./transactions";
export declare type NftData = NftDTO;
export declare type NftTokenData = NftTokenDTO;
export declare class Nft {
    protected nftData: NftData;
    protected readonly walletContract: Contract;
    constructor(nftData: NftData);
    protected buildTransferMultiSigPayloadTemplate(wallet: EthLikeWallet): Promise<{
        walletNonce: import("bn.js");
        value: import("bn.js");
        walletAddress: string;
    }>;
    getId(): number;
    getName(): string;
    getAddress(): string;
    getSymbol(): string;
    buildTransferMultiSigPayload(wallet: EthLikeWallet, to: string, tokenOnchainId: string): Promise<MultiSigPayload>;
}
