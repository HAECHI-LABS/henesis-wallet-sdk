import { BlockchainType } from "../blockchain";
import { Balance, Key, Keychains } from "../types";
import { Client } from "../httpClient";
import { UserWalletDTO } from "../__generate__/eth";
import { EthLikeWallet, EthWalletData, EthMasterWalletData, EthTransaction } from "./abstractWallet";
import BN from "bn.js";
import { Coin } from "./coin";
export declare const transformDepositAddressData: (data: UserWalletDTO) => EthDepositAddressData;
export interface EthDepositAddressData extends Omit<EthWalletData, "encryptionKey"> {
}
export declare class EthDepositAddress extends EthLikeWallet {
    private readonly depositWalletData;
    constructor(client: Client, data: EthMasterWalletData, keychains: Keychains, depositWalletData: EthDepositAddressData, blockchain: BlockchainType);
    getBalance(flag?: boolean, symbol?: string): Promise<Balance[]>;
    getAddress(): string;
    getData(): EthDepositAddressData;
    getId(): string;
    changeName(name: string): Promise<void>;
    transfer(coin: string | Coin, to: string, amount: BN, passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN): Promise<EthTransaction>;
    contractCall(contractAddress: string, value: BN, data: string, passphrase: string, otpCode?: string, gasPrice?: BN, gasLimit?: BN): Promise<EthTransaction>;
    changePassphrase(passphrase: string, newPassphrase: string, otpCode?: string): Promise<void>;
    restorePassphrase(encryptedPassphrase: string, newPassphrase: string, otpCode?: string): Promise<void>;
    verifyEncryptedPassphrase(encryptedPassphrase: string): Promise<boolean>;
    verifyPassphrase(passphrase: string): Promise<boolean>;
    getEncryptionKey(): any;
    getAccountKey(): Key;
    updateAccountKey(key: Key): void;
}
