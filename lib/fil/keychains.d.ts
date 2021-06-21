import { Key, Keychains, KeyWithPriv } from "../types";
import { FilAccountKey } from "./abstractWallet";
export interface FilKeyWithPriv extends KeyWithPriv {
    chainCode: string;
}
export declare class FilKeychains implements Keychains {
    changePassword(key: FilAccountKey, password: string, newPassword: string): FilKeyWithPriv;
    create(password: string): KeyWithPriv;
    createWithChainCode(password: string): FilKeyWithPriv;
    derive(key: FilAccountKey, password: string, childNumber: number): KeyWithPriv;
    decrypt(key: Key, password: string): string;
    sign(key: Key, password: string, hexPayload: string): string;
    private encryptValueToKeyFile;
    private getAddress;
    private generateRandomSeed;
}
