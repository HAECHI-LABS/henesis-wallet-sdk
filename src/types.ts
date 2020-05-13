import BN from 'bn.js';
import { BlockchainType } from './blockchain';

export interface Keychains {
  create(password: string): KeyWithPriv;

  changePassword(keyFile: string, password: string, newPassword: string): KeyWithPriv;

  decryptKeyFile(keyFile: string, password: string): string;

  signPayload(blockchain: BlockchainType, hexPayload: string, keyFile: string, password: string): string;

  recoverAddressFromSignature(blockchain: BlockchainType, hexPayload: string, signature: string): string;
}

export interface Balance {
  coinType: string;
  amount: BN;
  name: string;
  symbol: string;
}

export interface Key {
  address: string;
  pub: string;
  keyFile: string;
}

export interface KeyWithPriv extends Key {
  priv: string;
}

export type Timestamp = number;

export interface SearchOptions {
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  start?: Timestamp;
  end?: Timestamp;
}

export interface PaginationOptions extends SearchOptions{
  page?: number;
  size?: number;
  sort?: string;
}

export interface Pagination<T> {
  pagination: {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
  }
  results: T[];
}

export interface Secret {
  secret: string;
}

export interface Token {
  accessToken: string;
}
