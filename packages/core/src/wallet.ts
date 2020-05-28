import BN from 'bn.js';
import { Client } from './httpClient';
import { BlockchainType } from './blockchain';
import { Keychains, Balance } from './types';

export interface WalletData {
  id: string;
  name: string;
  address: string;
  blockchain: BlockchainType;
  createdAt: string;
  status: WalletStatus;
}

export enum WalletStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
}

export abstract class Wallet<T> {
  protected readonly client: Client;

  protected readonly baseUrl = '/wallets';

  protected readonly keychains: Keychains;

  protected constructor(client: Client, keychains: Keychains) {
    this.client = client;
    this.keychains = keychains;
  }

  abstract getChain(): BlockchainType;

  abstract verifyAddress(address: string): boolean;

  abstract transfer(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
  ): Promise<T>;

  abstract replaceTransaction(
    transactionId: string,
    otpCode?: string,
  ): Promise<T>;

  abstract contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
    otpCode?: string,
  ): Promise<T>;

  abstract getBalance(): Promise<Balance[]>;

  abstract getAddress(): string;

  abstract getId(): string;

  abstract changeName(name: string);
}
