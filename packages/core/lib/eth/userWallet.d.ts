import { BlockchainType } from "../blockchain";
import { Balance, Key, Keychains } from "../types";
import { Client } from "../httpClient";
import { UserWalletDTO } from "../__generate__/eth";
import { EthWalletData, EthLikeWallet, EthMasterWalletData, EthTransaction } from "./abstractWallet";
import { Nft } from "./nft";
import BN from "bn.js";
import { SignedMultiSigPayload } from "./transactions";
export declare const transformUserWalletData: (data: UserWalletDTO) => EthUserWalletData;
export interface EthUserWalletData extends Omit<EthWalletData, "encryptionKey"> {
}
export declare class EthUserWallet extends EthLikeWallet {
    private readonly userWalletData;
    constructor(client: Client, data: EthMasterWalletData, keychains: Keychains, userWalletData: EthUserWalletData, blockchain: BlockchainType);
    getBalance(flag?: boolean, symbol?: string): Promise<Balance[]>;
    getAddress(): string;
    getData(): EthUserWalletData;
    getId(): string;
    changeName(name: string): Promise<void>;
    changePassphrase(passphrase: string, newPassphrase: string, otpCode?: string): Promise<void>;
    restorePassphrase(encryptedPassphrase: string, newPassphrase: string, otpCode?: string): Promise<void>;
    verifyEncryptedPassphrase(encryptedPassphrase: string): Promise<boolean>;
    verifyPassphrase(passphrase: string): Promise<boolean>;
    getEncryptionKey(): any;
    getAccountKey(): Key;
    updateAccountKey(key: Key): void;
    transferNft(nft: number | Nft, tokenOnchainId: string, to: string, passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
    sendNftTransaction(signedMultiSigPayload: SignedMultiSigPayload, nft: Nft, tokenOnchainId: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN, metadata?: string): Promise<EthTransaction>;
}
