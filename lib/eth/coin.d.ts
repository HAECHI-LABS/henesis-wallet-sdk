import BN from "bn.js";
import { Contract } from "web3-eth-contract";
import { CoinDTO, CoinDTOAttributesEnum } from "../__generate__/eth";
import { MultiSigPayload } from "./transactions";
import { EthLikeWallet } from "./abstractWallet";
export import AttributesEnum = CoinDTOAttributesEnum;
export declare type CoinData = CoinDTO;
export declare abstract class Coin {
    protected coinData: CoinData;
    protected readonly walletContract: Contract;
    protected constructor(coinData: CoinData);
    getCoinData(): CoinData;
    abstract buildTransferMultiSigPayload(wallet: EthLikeWallet, to: string, amount: BN): Promise<MultiSigPayload>;
    protected buildTransferMultiSigPayloadTemplate(wallet: EthLikeWallet): Promise<{
        walletNonce: BN;
        value: BN;
        walletAddress: string;
    }>;
    abstract getName(): string;
    abstract buildFlushData(wallet: EthLikeWallet, targetAddresses: string[]): string;
    getAttributes(): AttributesEnum[];
}
export declare class StandardErc20 extends Coin {
    constructor(coinData: CoinData);
    getAddress(): string;
    getName(): string;
    buildTransferMultiSigPayload(wallet: EthLikeWallet, to: string, amount: BN): Promise<MultiSigPayload>;
    buildFlushData(wallet: EthLikeWallet, targetAddresses: string[]): string;
}
export declare class NonStandardReturnTypeErc20 extends Coin {
    private readonly erc20Contract;
    constructor(coinData: CoinData);
    getAddress(): string;
    getName(): string;
    buildTransferMultiSigPayload(wallet: EthLikeWallet, to: string, amount: BN): Promise<MultiSigPayload>;
    buildFlushData(wallet: EthLikeWallet, targetAddresses: string[]): string;
}
export declare class Eth extends Coin {
    constructor(coinData: CoinData);
    getName(): string;
    buildTransferMultiSigPayload(wallet: EthLikeWallet, to: string, amount: BN): Promise<MultiSigPayload>;
    buildFlushData(wallet: EthLikeWallet, targetAddresses: string[]): string;
}
export declare class Klay extends Coin {
    constructor(coinData: CoinData);
    getName(): string;
    buildTransferMultiSigPayload(wallet: EthLikeWallet, to: string, amount: BN): Promise<MultiSigPayload>;
    buildFlushData(wallet: EthLikeWallet, targetAddresses: string[]): string;
}
