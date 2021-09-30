import { Pagination } from "../types";
import { Client } from "../httpClient";
import { EthCallEvent, EthEventPaginationOptions, EthNftTransferEvent, EthNftTransferEventPaginationOptions, EthValueTransferEvent, EthValueTransferEventPaginationOptions } from "../events";
import { ValueTransferEventInternalDTO, SimplifiedTransactionInternalDTO, CallEventInternalDTO, NftTransferEventInternalDTO } from "../__generate__/eth";
import BN from "bn.js";
export interface SimplifiedTransactionInternal extends Omit<SimplifiedTransactionInternalDTO, "blockNumber"> {
    blockNumber: BN;
}
export interface ValueTransferEventInternal extends Omit<ValueTransferEventInternalDTO, "amount" | "confirmation" | "transaction"> {
    amount: BN;
    confirmation: BN;
    transaction: SimplifiedTransactionInternal;
}
export interface NftTransferEventInternal extends Omit<NftTransferEventInternalDTO, "confirmation" | "transaction"> {
    confirmation: BN;
    transaction: SimplifiedTransactionInternal;
}
export interface CallEventInternal extends Omit<CallEventInternalDTO, "confirmation" | "transaction"> {
    confirmation: BN;
    transaction: SimplifiedTransactionInternal;
}
export declare class EthEvents {
    private readonly client;
    constructor(client: Client);
    getCallEvents(options?: EthEventPaginationOptions): Promise<Pagination<EthCallEvent>>;
    getValueTransferEvents(options?: EthValueTransferEventPaginationOptions): Promise<Pagination<EthValueTransferEvent>>;
    getNftTransferEvents(options?: EthNftTransferEventPaginationOptions): Promise<Pagination<EthNftTransferEvent>>;
    getInternalCallEvents(options?: EthEventPaginationOptions): Promise<Pagination<CallEventInternal>>;
    getInternalValueTransferEvents(options?: EthValueTransferEventPaginationOptions): Promise<Pagination<ValueTransferEventInternal>>;
    getInternalNftTransferEvents(options?: EthNftTransferEventPaginationOptions): Promise<Pagination<NftTransferEventInternal>>;
    private convertSimplifiedTransaction;
}
