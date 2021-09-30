/// <reference types="node" />
import { RecoveryKit } from "./recoverykit";
import { Client } from "./httpClient";
import { Key, Keychains, KeyWithPriv } from "./types";
import { Env } from "./sdk";
export interface WalletSearchOptions {
    name?: string;
    sort?: string;
}
export declare abstract class Wallets<T> {
    protected readonly env: Env;
    protected readonly baseUrl = "/wallets";
    protected readonly client: Client;
    protected readonly keychains: Keychains;
    protected constructor(env: Env, client: Client, keychains: Keychains);
    abstract verifyAddress(address: string): boolean;
    abstract createRecoveryKit(name: string, passphrase: string): Promise<RecoveryKit>;
    protected createEncryptionKey(p: string): Buffer;
    protected removePrivateKey(key: KeyWithPriv): Key;
    protected removeKeyFile(key: KeyWithPriv | Key): KeyWithPriv | Key;
    protected createDummyEncryptionKey(): string;
}
