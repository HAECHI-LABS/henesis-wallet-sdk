import BN from 'bn.js';

export interface Balance {
  coinId: number;
  coinType: string;
  amount: BN;
  name: string;
  symbol: string;
  spendableAmount: BN;
}

export interface Key {
  address: string;
  pub: string;
  keyFile?: string;
}

export interface KeyWithPriv extends Key {
  priv: string;
}

export type Timestamp = number;

export enum BlockchainType {
  Ethereum = 'ETHEREUM',
  Klaytn = 'KLAYTN',
}

export enum CoinAttribute {
  ERC20_STANDARD = 'ERC20_STANDARD',
  ERC20_NON_STANDARD_RETURN_TYPE = 'ERC20_NON_STANDARD_RETURN_TYPE',
}

export interface SearchOptions {
  toAddress?: string;
  fromAddress?: string;
  transactionHash?: string;
  start?: Timestamp;
  end?: Timestamp;
}

export interface PaginationOptions extends SearchOptions {
  page?: number;
  size?: number;
  sort?: string;
}

export interface Pagination<T> {
  pagination: {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
  };
  results: T[];
}

export interface Secret {
  secret: string;
}

export interface Token {
  accessToken: string;
}
