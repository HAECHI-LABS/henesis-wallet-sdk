import BN from "bn.js";
import { Client } from "./httpClient";
import { BlockchainType } from "./blockchain";
import { Keychains, Balance } from "./types";

export interface WalletData {
  id: string;
  name: string;
  address: string;
  blockchain: BlockchainType;
  createdAt: string;
  status: WalletStatus;
  transactionId: string;
  error: string | null;
}

export enum WalletStatus {
  Inactive = "INACTIVE",
  Active = "ACTIVE",
}

export abstract class Wallet<T, K> {
  protected readonly client: Client;

  protected readonly baseUrl = "/wallets";

  protected readonly keychains: K;

  protected constructor(client: Client, keychains: K) {
    this.client = client;
    this.keychains = keychains;
  }

  abstract getChain(): BlockchainType;

  abstract transfer(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string
  ): Promise<T>;

  abstract getBalance(): Promise<Balance[]>;

  abstract getAddress(): string;

  abstract getId(): string;

  abstract changeName(name: string);

  abstract restorePassphrase(
    encryptedPassphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void>

  abstract changePassphrase(
    passphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void>;

  abstract verifyPassphrase(
    passphrase: string
  ): Promise<boolean>;

  abstract verifyEncryptedPassphrase(
    encryptedPassphrase: string
  ): Promise<boolean>;
}
