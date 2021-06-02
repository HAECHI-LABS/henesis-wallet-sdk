import { RecoveryKit } from "./recoverykit";
import { Client } from "./httpClient";
import { Key, Keychains, KeyWithPriv } from "./types";
import { Env } from "./sdk";
import Web3 from "web3";
import pbkdf2 from "pbkdf2";
import _ from "lodash";

export abstract class Wallets<T> {
  protected readonly env: Env;

  protected readonly baseUrl = "/wallets";

  protected readonly client: Client;

  protected readonly keychains: Keychains;

  protected constructor(env: Env, client: Client, keychains: Keychains) {
    this.env = env;
    this.client = client;
    this.keychains = keychains;
  }

  abstract verifyAddress(address: string): boolean;

  abstract createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<RecoveryKit>;

  protected createEncryptionKey(p: string): Buffer {
    const randomHex = Web3.utils.randomHex(32);
    return pbkdf2.pbkdf2Sync(p, randomHex, 1, 256 / 8, "sha512");
  }

  protected removePrivateKey(key: KeyWithPriv): Key {
    return {
      address: key.address,
      pub: key.pub,
      keyFile: key.keyFile,
    };
  }

  protected removeKeyFile(key: KeyWithPriv | Key): KeyWithPriv | Key {
    return _.omit(key, "keyFile");
  }

  protected createDummyEncryptionKey(): string {
    let dummyKey = "";
    const length = 64;
    for (let i = 0; i < length; i++) {
      dummyKey += "f";
    }
    return dummyKey;
  }
}
