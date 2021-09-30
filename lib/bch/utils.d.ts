/// <reference types="node" />
import { TransactionDTO as BtcTransactionDTO, TransferDTO, TransferInternalDTO } from "../__generate__/btc";
import { Transfer, TransferInternal } from "./transfers";
import { BchTransaction } from "./wallet";
import { Buffer } from "buffer";
export declare const convertTransactionDTO: (transaction: BtcTransactionDTO) => BchTransaction;
export declare const convertTransferDTO: (t: TransferDTO) => Transfer;
export declare const convertTransferInternalDTO: (transfer: TransferInternalDTO) => TransferInternal;
export declare function convertToLegacyAddress(address: string): string | null;
export declare function convertToNewAddress(address: string): string | null;
export declare function isLegacyAddress(address: string): boolean;
export declare function isNewAddress(address: string): boolean;
export declare const encodeScriptSignature: (signature: Buffer, hashType: number) => Buffer;
