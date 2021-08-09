import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import { AccountKeyDTO, SimplifiedWalletInternalDTO, TransactionDTO } from "../__generate__/fil";
import { FilKeychains } from "./keychains";
import BN from "bn.js";
import { Key } from "../types";
import { RawTransaction, SignedTransaction } from "./wallet";
import { FilTransfer } from "./transfers";
export interface FilTransaction extends Omit<TransactionDTO, "nonce" | "amount" | "gasLimit" | "gasFeeCap" | "gasPremium" | "gasUsed" | "feeAmount"> {
    nonce: BN;
    amount: BN;
    gasLimit?: BN;
    gasFeeCap?: BN;
    gasPremium?: BN;
    gasUsed?: BN;
    feeAmount?: BN;
}
export declare type FilAccountKey = AccountKeyDTO;
export declare type FilSimplifiedWallet = SimplifiedWalletInternalDTO;
export interface FilAbstractWalletData extends WalletData {
    blockchain: BlockchainType;
    orgId: string;
    whitelistActivated?: boolean;
    error?: string | null;
}
export interface FilWalletData extends FilAbstractWalletData {
    accountKey: FilAccountKey;
    error?: string | null;
    confirmation?: string | null;
    transaction?: TransactionDTO;
}
export declare abstract class FilAbstractWallet extends Wallet<FilTransaction> {
    protected data: FilWalletData;
    protected keychains: FilKeychains;
    protected readonly blockchain: BlockchainType;
    protected constructor(client: Client, data: FilWalletData, keychains: FilKeychains, baseUrl: string);
    getChain(): BlockchainType;
    abstract transfer(to: string, amount: BN, passphrase: string): Promise<FilTransfer>;
    protected signRawTransaction(rawTransaction: RawTransaction, key: Key, passphrase: string, fromSeed?: boolean): SignedTransaction;
    private createMessageSignature;
    private calculateCidFromMessage;
    private calculateCidFromMessageAndSignature;
}
