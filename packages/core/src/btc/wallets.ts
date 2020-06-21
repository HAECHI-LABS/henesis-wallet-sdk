import { Client } from "../httpClient";
import { BtcMasterWallet, BtcMasterWalletData } from "./wallet";
import Web3 from "web3";
import pbkdf2 from "pbkdf2";
import { Wallets } from "../wallets";
import aesjs from "aes-js";
import { Keychains } from "../types";
import { MasterWalletSearchOptions } from "../eth";
import { RecoveryKit } from "../recoverykit";

export class BtcWallets extends Wallets<BtcMasterWallet> {
  public constructor(client: Client, keychains: Keychains) {
    super(client, keychains);
  }

  public async createMasterWallet(
    name: string,
    passphrase: string
  ): Promise<BtcMasterWallet> {
    const accountKeyWithPriv = this.keychains.create(passphrase);
    const backupKetWithPriv = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const data: BtcMasterWalletData = await this.client.post<
      BtcMasterWalletData
    >(this.baseUrl, {
      name,
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      accountKey: {
        keyFile: accountKeyWithPriv.keyFile,
        pub: accountKeyWithPriv.pub,
      },
      backupKey: {
        keyFile: backupKetWithPriv.keyFile,
        pub: backupKetWithPriv.pub,
      },
    });

    return new BtcMasterWallet(data, this.client, this.keychains);
  }

  public async getWallet(id: string) {
    const data: BtcMasterWalletData = await this.client.get<
      BtcMasterWalletData
    >(`${this.baseUrl}/${id}`);
    return new BtcMasterWallet(data, this.client, this.keychains);
  }

  public verifyAddress(address: string): boolean {
    return true;
  }

  private createEncryptionKey(p: string): Buffer {
    const randomHex = Web3.utils.randomHex(32);
    return pbkdf2.pbkdf2Sync(p, randomHex, 1, 256 / 8, "sha512");
  }

  getMasterWallets(options?: MasterWalletSearchOptions): Promise<BtcMasterWallet[]> {
    throw new Error("Method not implemented.");
  }
  createRecoveryKit(name: string, passphrase: string): Promise<import("../recoverykit").RecoveryKit> {
    throw new Error("Method not implemented.");
  }
  createMasterWalletWithKit(recoveryKit: RecoveryKit): Promise<import("../eth/wallet").EthMasterWallet> {
    throw new Error("Method not implemented.");
  }
}
