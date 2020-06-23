import BN from "bn.js";

export interface Keychains {
  create(password: string): KeyWithPriv;

  changePassword(key: Key, password: string, newPassword: string): KeyWithPriv;

  decrypt(key: Key, password: string): string;

  sign(key: Key, password: string, hexPayload: string): string;
}

export interface Balance {
  coinType: string;
  amount: BN;
  name: string;
  symbol: string;
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
