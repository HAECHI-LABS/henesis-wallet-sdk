import BN from 'bn.js';

export interface Balance {
  balance: BN;
}

export interface Key {
  address: string;
  pub: string;
  keyFile: string;
}

export interface PaginationOptions {
  page: number;
  size: number;
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
