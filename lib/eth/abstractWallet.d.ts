import BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { Key, Keychains } from "../types";
import { MultiSigPayload, SignedMultiSigPayload } from "./transactions";
import { Client } from "../httpClient";
import BatchRequest from "./batch";
import { WalletData, Wallet } from "../wallet";
import { Coins } from "./coins";
import { TransactionDTO, SignedMultiSigPayloadDTO } from "../__generate__/eth";
import { Coin } from "./coin";
export declare type EthTransaction = Omit<TransactionDTO, "blockchain"> & {
    blockchain: BlockchainType;
};
export interface EthWalletData extends WalletData {
    blockchain: BlockchainType;
    transactionId?: string | null;
    error?: string | null;
}
export interface EthMasterWalletData extends EthWalletData {
    accountKey: Key;
    encryptionKey: string;
    whitelistActivated: boolean;
}
export declare function convertSignedMultiSigPayloadToDTO(signedMultiSigPayload: SignedMultiSigPayload): SignedMultiSigPayloadDTO;
export declare function getAddressFromCompressedPub(pub: string): string;
export declare abstract class EthLikeWallet extends Wallet<EthTransaction> {
    protected data: EthMasterWalletData;
    protected readonly DEFAULT_CONTRACT_CALL_GAS_LIMIT: BN;
    protected readonly DEFAULT_COIN_TRANSFER_GAS_LIMIT: BN;
    protected readonly DEFAULT_TOKEN_TRANSFER_GAS_LIMIT: BN;
    protected readonly blockchain: BlockchainType;
    protected readonly coins: Coins;
    protected constructor(client: Client, data: EthMasterWalletData, keychains: Keychains, blockchain: BlockchainType, baseUrl: string);
    getChain(): BlockchainType;
    getVersion(): string;
    getVersionNumber(): number;
    replaceTransaction(transactionId: string, gasPrice?: BN): Promise<EthTransaction>;
    resendTransaction(transactionId: string, gasPrice?: BN, gasLimit?: BN): Promise<EthTransaction>;
    contractCall(contractAddress: string, value: BN, data: string, passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    buildContractCallPayload(contractAddress: string, value: BN, data: string, passphrase: string): Promise<SignedMultiSigPayload>;
    transfer(coin: string | Coin, to: string, amount: BN, passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    buildTransferPayload(coin: string | Coin, to: string, amount: BN, passphrase: string): Promise<SignedMultiSigPayload>;
    createRawTransaction(coin: string | Coin, to: string, amount: BN): Promise<MultiSigPayload>;
    createBatchRequest(otpCode?: string): BatchRequest;
    protected signPayload(multiSigPayload: MultiSigPayload, passphrase: string): SignedMultiSigPayload;
    sendTransaction(signedMultiSigPayload: SignedMultiSigPayload, walletId: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    protected sendBatchTransaction(blockchain: BlockchainType, signedMultiSigPayloads: SignedMultiSigPayload[], walletId: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN): Promise<EthTransaction[]>;
    getNonce(): BN;
    protected getGasLimitByTicker(coin: Coin): BN;
}
