import { Key, Keychains, KeyWithPriv } from "../types";
import { BlockchainType } from "../blockchain";
export declare const encodeSignature: ([v, r, s]: [any, any, any]) => string;
export declare const decodeSignature: (hex: any) => string[];
export declare const toChecksum: (address: any) => string;
export declare const bytesToWord: (bytes?: Uint8Array) => number;
export declare class EthKeychains implements Keychains {
    private readonly blockchain;
    constructor(blockchain: BlockchainType);
    create(password: string): KeyWithPriv;
    changePassword(key: Key, password: string, newPassword: string): KeyWithPriv;
    decrypt(key: Key, password: string): string;
    sign(key: Key, password: string, hexPayload: string): string;
    recoverAddressFromSignature(hexPayload: string, signature: string): string;
    private encryptPrivToKeyFile;
    private payloadToPrefixedMessage;
    private blockchainPrefix;
}
