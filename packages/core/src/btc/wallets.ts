import { Client } from "../httpClient";
import { BtcMasterWallet, BtcMasterWalletData } from "./wallet";
import { BtcSubModule } from "./module";
import Web3 from "web3";
import pbkdf2 from "pbkdf2";
import { BTCKeychains } from "./keychains";
import aesjs from "aes-js";

export class BTCWallets extends BtcSubModule {
  protected readonly client: Client;

  private readonly baseUrl: string;

  private readonly keychains: BTCKeychains;

  public constructor(client: Client, keychains: BTCKeychains) {
    super();
    this.client = client;
    this.baseUrl = this.getBaseUrl() + "/wallets";
    this.keychains = keychains;
  }

  public async createMasterWallet(name: string, passphrase: string): Promise<BtcMasterWallet> {
    const accountKeyWithPriv = this.keychains.create(passphrase);
    const backupKetWithPriv = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);

    // todo remove static orgId
    const orgId = "orgId";
    const data: BtcMasterWalletData = await this.client.post<BtcMasterWalletData>(
      this.baseUrl, {
        name,
        encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
        orgId,
        accountKey: {
          keyFile: accountKeyWithPriv.keyFile,
          pub: accountKeyWithPriv.pub
        },
        backupKey: {
          keyFile: backupKetWithPriv.keyFile,
          pub: backupKetWithPriv.pub
        }
      }
    );

    return new BtcMasterWallet(
      data,
      this.client,
      this.keychains
    );
  }

  public async getWallet(id: string) {
    const data: BtcMasterWalletData = await this.client.get<BtcMasterWalletData>(
      `${this.baseUrl}/${id}`);
    return new BtcMasterWallet(
      data,
      this.client,
      this.keychains
    );
  }

  private createEncryptionKey(p: string): Buffer {
    const randomHex = Web3.utils.randomHex(32);
    return pbkdf2.pbkdf2Sync(p, randomHex, 1, 256 / 8, "sha512");
  }
}