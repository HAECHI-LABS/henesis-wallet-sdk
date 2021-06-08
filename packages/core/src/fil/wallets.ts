import aesjs from "aes-js";
import { Base64 } from "js-base64";
import { FilWallet } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import { Env } from "../sdk";
import { convertWalletData } from "./wallet";
import { WalletDTO } from "../__generate__/fil";
import { RecoveryKit } from "../recoverykit";
import { checkNullAndUndefinedParameter } from "../utils/common";
import { FilFeeWallets } from "./feeWallets";
import { FilKeychains, FilKeyWithPriv } from "./keychains";
import { Key, KeyWithPriv } from "../types";
import { addressAsBytes } from "./fil-core-lib/utils";

export class FilRecoveryKit extends RecoveryKit {
  accountKey: FilKeyWithPriv;

  constructor(
    name: string,
    blockchain: BlockchainType,
    henesisKey: Key,
    accountKey: FilKeyWithPriv,
    backupKey: KeyWithPriv,
    encryptedPassphrase: string,
    encryptionKey: string,
    env: Env
  ) {
    super(
      name,
      blockchain,
      henesisKey,
      accountKey,
      backupKey,
      encryptedPassphrase,
      encryptionKey,
      env
    );
    this.accountKey = accountKey;
  }
}

export class FilWallets extends Wallets<FilWallet> {
  private readonly blockchain: BlockchainType;
  private readonly feeWallets: FilFeeWallets;
  protected readonly keychains: FilKeychains;

  constructor(
    client: Client,
    keychains: FilKeychains,
    env: Env,
    blockchain: BlockchainType,
    feeWallets: FilFeeWallets
  ) {
    super(env, client, keychains);
    this.blockchain = blockchain;
    this.feeWallets = feeWallets;
  }

  // IMPORTANT - Filecoin recovery kit's account key section has the cipher of account key's seed, not account key's private key
  async createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<FilRecoveryKit> {
    const accountKey = this.keychains.createWithChainCode(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
    const feeWallet = await this.feeWallets.getFeeWallet();
    const henesisKey = feeWallet.defaultFeeWallet;

    const aes = new aesjs.ModeOfOperation.ctr(encryptionKeyBuffer);
    const encryptedPassphrase = aesjs.utils.hex.fromBytes(
      aes.encrypt(aesjs.utils.utf8.toBytes(passphrase))
    );

    return new FilRecoveryKit(
      name,
      this.blockchain,
      henesisKey,
      accountKey,
      backupKey,
      Base64.encode(encryptedPassphrase),
      aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      this.env
    );
  }

  verifyAddress(address: string): boolean {
    checkNullAndUndefinedParameter({ address });
    try {
      addressAsBytes(address);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getWallet(id: string): Promise<FilWallet> {
    const walletData = await this.client.get<NoUndefinedField<WalletDTO>>(
      `${this.baseUrl}/${id}`
    );
    return new FilWallet(
      this.client,
      convertWalletData(walletData),
      this.keychains
    );
  }

  async getWallets(options?: WalletSearchOptions): Promise<FilWallet[]> {
    const walletDataList = await this.client.get<NoUndefinedField<WalletDTO>[]>(
      `${this.baseUrl}`
    );
    return walletDataList.map((walletData) => {
      return new FilWallet(
        this.client,
        convertWalletData(walletData),
        this.keychains
      );
    });
  }

  async createWalletWithKit(recoveryKit: FilRecoveryKit): Promise<FilWallet> {
    const walletData = await this.client.post<NoUndefinedField<WalletDTO>>(
      this.baseUrl,
      {
        name: recoveryKit.getName(),
        encryptionKey: recoveryKit.getEncryptionKey(),
        accountKey: recoveryKit.getAccountKey(),
        backupKey: recoveryKit.getBackupKey(),
      }
    );
    return new FilWallet(
      this.client,
      convertWalletData(walletData),
      this.keychains
    );
  }

  async retryCreateWallet(walletId: string) {
    checkNullAndUndefinedParameter({ walletId });
    const response = await this.client.post<WalletDTO>(
      `${this.baseUrl}/${walletId}/recreate`
    );
    return new FilWallet(
      this.client,
      convertWalletData(response),
      this.keychains
    );
  }
}
