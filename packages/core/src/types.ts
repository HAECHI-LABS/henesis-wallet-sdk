import BN from "bn.js";

export type Keychains = {
  create(password: string): KeyWithPriv;

  changePassword(key: Key, password: string, newPassword: string): KeyWithPriv;

  decrypt(key: Key, password: string): string;

  sign(key: Key, password: string, hexPayload: string): string;
};

export type Balance = {
  coinId: number | null;
  coinType: string;
  amount: BN;
  spendableAmount?: BN;
  name: string;
  symbol: string;
  aggregatedAmount?: BN;
  decimals: number;
};

export type Key = {
  address?: string;
  pub: string;
  keyFile?: string;
};

export type KeyWithPriv = Key & {
  priv: string;
};

export type Timestamp = number;

export type PaginationOptions = {
  page?: number;
  size?: number;
  sort?: string;
};

export type Pagination<T> = {
  pagination: {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
  };
  results: T[];
};

export type Secret = {
  secret: string;
};

export type Token = {
  accessToken: string;
};
