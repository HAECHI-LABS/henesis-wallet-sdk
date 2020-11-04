import BN from "bn.js";

export interface Keychains {
  create(password: string): KeyWithPriv;

  changePassword(privateKey: string, newPassword: string): KeyWithPriv;

  decrypt(keyFile: string, passphrase: string): string;

  sign(privateKey: string, hexPayload: string): string;
}

export interface Balance {
  coinId: number | null;
  coinType: string;
  amount: BN;
  spendableAmount?: BN;
  name: string;
  symbol: string;
  aggregatedAmount?: BN;
  decimals: number;
}

export interface Key {
  address?: string;
  pub: string;
  keyFile?: string;
}

export interface KeyWithPriv extends Key {
  priv: string;
}

export type Timestamp = number;

export interface PaginationOptions {
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
