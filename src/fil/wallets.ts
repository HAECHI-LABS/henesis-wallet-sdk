import aesjs from "aes-js";
import { Base64 } from "js-base64";
import { FilMasterWallet } from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { BlockchainType } from "../blockchain";
import { Client } from "../httpClient";
import { Env } from "../sdk";
import { convertWalletData } from "./wallet";
import { MasterWalletDTO } from "../__generate__/fil";
import { RecoveryKit } from "../recoverykit";
import { checkNullAndUndefinedParameter } from "../utils/common";
import { FilFeeWallets } from "./feeWallets";
import { FilKeychains, FilKeyWithPriv } from "./keychains";
import { Key, KeyWithPriv } from "../types";
import { addressAsBytes } from "./fil-core-lib/utils";
import { makeQueryString } from "../utils/url";

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

  getAccountKey(): FilKeyWithPriv {
    return this.accountKey;
  }
}

export class FilWallets extends Wallets<FilMasterWallet> {
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

    // eslint-disable-next-line new-cap
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

  async getMasterWallet(id: string): Promise<FilMasterWallet> {
    const masterWalletData = await this.client.get<
      NoUndefinedField<MasterWalletDTO>
    >(`${this.baseUrl}/${id}`);
    return new FilMasterWallet(
      this.client,
      convertWalletData(masterWalletData),
      this.keychains
    );
  }

  async getMasterWallets(
    options?: WalletSearchOptions
  ): Promise<FilMasterWallet[]> {
    const queryString = makeQueryString(options);
    const masterWalletDataList = await this.client.get<
      NoUndefinedField<MasterWalletDTO>[]
    >(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);
    return masterWalletDataList.map((walletData) => {
      return new FilMasterWallet(
        this.client,
        convertWalletData(walletData),
        this.keychains
      );
    });
  }

  async createMasterWalletWithKit(
    recoveryKit: FilRecoveryKit
  ): Promise<FilMasterWallet> {
    const accountKey = recoveryKit.getAccountKey();
    const backupKey = recoveryKit.getBackupKey();

    const masterWalletData = await this.client.post<
      NoUndefinedField<MasterWalletDTO>
    >(this.baseUrl, {
      name: recoveryKit.getName(),
      encryptionKey: recoveryKit.getEncryptionKey(),
      accountKey: {
        address: accountKey.address,
        pub: accountKey.pub,
        keyFile: accountKey.keyFile,
        chainCode: accountKey.chainCode,
      },
      backupKey: {
        pub: backupKey.pub,
        keyFile: backupKey.keyFile,
      },
    });
    return new FilMasterWallet(
      this.client,
      convertWalletData(masterWalletData),
      this.keychains
    );
  }

  async retryCreateMasterWallet(masterWalletId: string) {
    checkNullAndUndefinedParameter({ masterWalletId });
    const response = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/${masterWalletId}/recreate`
    );
    return new FilMasterWallet(
      this.client,
      convertWalletData(response),
      this.keychains
    );
  }
}
