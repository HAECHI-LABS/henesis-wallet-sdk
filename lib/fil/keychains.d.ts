import { Key, Keychains, KeyWithPriv } from "../types";
import { Env } from "../sdk";
import { FilAccountKey } from "./abstractWallet";
export interface FilKeyWithPriv extends KeyWithPriv {
    chainCode: string;
}
export declare class FilKeychains implements Keychains {
    protected readonly env: Env;
    constructor(env: Env);
    changePassword(key: Key, password: string, newPassword: string): FilKeyWithPriv;
    create(password: string): KeyWithPriv;
    createWithChainCode(password: string): FilKeyWithPriv;
    derive(key: FilAccountKey, password: string, childNumber: number): KeyWithPriv;
    deriveFromPublicKey(key: FilAccountKey, childNumber: number): Key;
    decrypt(key: Key, password: string, fromSeed?: boolean): string;
    sign(key: Key, password: string, hexPayload: string, fromSeed?: boolean): string;
    private privateKeyFromSeed;
    private encryptValueToKeyFile;
    private getAddress;
    private generateRandomSeed;
}
