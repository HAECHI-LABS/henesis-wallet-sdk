import { Key, Keychains, KeyWithPriv } from "../types";
import { Env } from "../sdk";
export declare class BchKeyChains implements Keychains {
    private env;
    constructor(env: Env);
    create(password: string): KeyWithPriv;
    sign(key: Key, password: string, hexPayload: string): string;
    changePassword(key: Key, password: string, newPassword: string): KeyWithPriv;
    decrypt(key: Key, password: string): string;
    private encryptECPair;
    private encryptRawPrivateKey;
    private decryptECPair;
}
