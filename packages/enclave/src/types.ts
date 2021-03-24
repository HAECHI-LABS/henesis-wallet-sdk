import * as BN from "./utils/bn";
import express from "express";
import { SDK } from "@haechi-labs/henesis-wallet-core";

declare module "express-serve-static-core" {
  export interface Request {
    sdk: SDK;
  }
}

export type MiddleWare = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => void;

export type ErrorHandler = (
  error: any,
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => void;

export interface Controller {
  getRoutes(): express.Router;
}

/**
 * @tsoaModel
 */
export interface CoinDTO {
  id: number;
  name: string;
  ticker: string;
  address: string;
  description: string;
  blockchain: string;
  decimals: number;
  attributes: string[];
}

/**
 * @tsoaModel
 */
export interface Pagination<T> {
  pagination: {
    nextUrl: string;
    previousUrl: string;
    totalCount: number;
  };
  results: T[];
}
/**
 * @tsoaModel
 */
export interface EthCallEvent extends Event {
  fromAddress: string;
  toAddress: string;
  data: string;
}

/**
 * @tsoaModel
 */
export interface ValueTransferEvent extends Event {
  amount: BN;
  decimals: number;
  coinSymbol: string;
  from: string;
  to: string;
  transferType: TransferType;
  walletName: string;
  walletType: WalletType;
}

/**
 * @tsoaModel
 */
export enum WalletType {
  MASTERWALLET = "MASTER_WALLET",
  USERWALLET = "USER_WALLET",
}

/**
 * @tsoaModel
 */
export enum TransferType {
  WITHDRAWAL = "WITHDRAWAL",
  DEPOSIT = "DEPOSIT",
}

/**
 * @tsoaModel
 */
export interface Event {
  id: number;
  createdAt: string;
  updatedAt: string;
  status: EventStatus;
  transactionHash?: string;
  walletId: string;
  transactionId?: string;
  orgId?: string;
  masterWalletId?: string;
  confirmation: BN;
}

/**
 * @tsoaModel
 */
export type Timestamp = number;

/**
 * @tsoaModel
 */
export enum EventStatus {
  PENDINGAPPROVAL = "PENDING_APPROVAL",
  REJECTED = "REJECTED",
  REQUESTED = "REQUESTED",
  PENDING = "PENDING",
  FAILED = "FAILED",
  REVERTED = "REVERTED",
  REPLACED = "REPLACED",
  MINED = "MINED",
  CONFIRMED = "CONFIRMED",
}
