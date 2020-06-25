import BN from "bn.js";
import { Client } from "./httpClient";
import { BlockchainType } from "./blockchain";
import { Keychains, Balance, Key, KeyWithPriv } from "./types";
import aesjs from "aes-js";
import { Base64 } from "js-base64";

export interface WalletData {
  id: string;
  name: string;
  address: string;
  encryptionKey: string;
  createdAt: string;
  status: WalletStatus;
}

export enum WalletStatus {
  Inactive = "INACTIVE",
  Active = "ACTIVE",
}

export abstract class Wallet<T> {
  protected readonly client: Client;

  protected readonly baseUrl = "/wallets";

  protected readonly keychains: Keychains;

  protected constructor(client: Client, keychains: Keychains) {
    this.client = client;
    this.keychains = keychains;
  }

  abstract getChain(): BlockchainType;

  abstract getBalance(): Promise<Balance[]>;

  abstract getAddress(): string;

  abstract getId(): string;

  abstract changeName(name: string);

  abstract getEncryptionKey(): string;

  abstract getAccountKey(): Key;

  abstract updateAccountKey(key: Key);

  protected recoverPassphrase(encryptedPassphrase: string): string {
    try {
      const aesCtr = new aesjs.ModeOfOperation.ctr(
        aesjs.utils.hex.toBytes(this.getEncryptionKey())
      );
      const decryptedBytes = aesCtr.decrypt(
        aesjs.utils.hex.toBytes(Base64.decode(encryptedPassphrase))
      );
      return aesjs.utils.utf8.fromBytes(decryptedBytes);
    } catch (e) {
      throw new Error("failed to recover passphrase");
    }
  }

  async changePassphrase(
    passphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    return await this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      undefined,
      otpCode
    );
  }

  private async changePassphraseWithKeyFile(
    passphrase: string,
    newPassphrase: string,
    initialKey?: Key,
    otpCode?: string
  ): Promise<void> {
    const newKey: KeyWithPriv = this.keychains.changePassword(
      initialKey ? initialKey : this.getAccountKey(),
      passphrase,
      newPassphrase
    );

    const key: Key = await this.client.patch<Key>(
      `${this.baseUrl}/${this.getId()}/account-key`,
      {
        keyFile: newKey.keyFile,
        pub: newKey.pub,
        otpCode,
      }
    );

    this.updateAccountKey(key);
  }

  async restorePassphrase(
    encryptedPassphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    const passphrase = this.recoverPassphrase(encryptedPassphrase);
    const initialKey: Key = await this.client.get<Key>(
      `${this.baseUrl}/${this.getId()}/initial-key`
    );
    await this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      initialKey,
      otpCode
    );
  }

  async verifyEncryptedPassphrase(
    encryptedPassphrase: string
  ): Promise<boolean> {
    let passphrase;
    try {
      passphrase = this.recoverPassphrase(encryptedPassphrase);
    } catch (e) {
      return false;
    }

    const initialKey: Key = await this.client.get<Key>(
      `${this.baseUrl}/${this.getId()}/initial-key`
    );
    return await this.verifyPassphraseWithKeyFile(passphrase, initialKey);
  }

  async verifyPassphrase(passphrase: string): Promise<boolean> {
    return this.verifyPassphraseWithKeyFile(passphrase);
  }

  protected async verifyPassphraseWithKeyFile(
    passphrase: string,
    initialKey?: Key
  ): Promise<boolean> {
    try {
      this.keychains.decrypt(
        initialKey ? initialKey : this.getAccountKey(),
        passphrase
      );
      return true;
    } catch (e) {
      return false;
    }
  }
}
