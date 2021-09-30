import * as BN from "bn.js";
import { PaginationOptions, Timestamp } from "./types";
import { EventStatus, TransferType, WalletType } from "./__generate__/eth";
import { NftData, NftTokenData } from "./eth/nft";
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
    metadata?: string;
}
export declare type EthCallEvent = CallEvent;
export interface CallEvent extends Event {
    fromAddress: string;
    toAddress: string;
    data: string;
}
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
export interface NftTransferEvent extends Event {
    nft: NftData;
    token: NftTokenData;
    from: string;
    to: string;
    transferType: TransferType;
    walletName: string;
    walletType: WalletType;
}
export declare type EthValueTransferEvent = ValueTransferEvent;
export declare type EthNftTransferEvent = NftTransferEvent;
export interface EventPaginationOptions extends PaginationOptions {
    address?: string;
    toAddress?: string;
    fromAddress?: string;
    transactionHash?: string;
    updatedAtGte?: Timestamp;
    updatedAtLt?: Timestamp;
    status?: EventStatus;
    walletId?: string;
    orgId?: string;
    masterWalletId?: string;
    transactionId?: string;
}
export interface CallEventPaginationOptions extends EventPaginationOptions {
    symbol?: string;
}
export interface ValueTransferEventPaginationOptions extends EventPaginationOptions {
    symbol?: string;
    transferType?: TransferType;
}
export interface NftTransferEventPaginationOptions extends EventPaginationOptions {
    nftId?: number;
    tokenOnchainId?: string;
    tokenName?: string;
    transferType?: TransferType;
}
export declare type EthEventPaginationOptions = CallEventPaginationOptions;
export declare type EthValueTransferEventPaginationOptions = ValueTransferEventPaginationOptions;
export declare type EthNftTransferEventPaginationOptions = NftTransferEventPaginationOptions;
