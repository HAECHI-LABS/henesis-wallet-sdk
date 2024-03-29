import aesjs from "aes-js";
import { Base64 } from "js-base64";
import * as BN from "bn.js";
import { Env } from "../sdk";
import { Client } from "../httpClient";
import { Keychains } from "../types";
import { BlockchainType, transformBlockchainType } from "../blockchain";
import { RecoveryKit } from "../recoverykit";
import {
  EthMasterWallet,
  EthWallet,
  transformMasterWalletData,
} from "./wallet";
import { Wallets, WalletSearchOptions } from "../wallets";
import { toChecksum } from "./keychains";
import { keccak256s } from "./eth-core-lib/hash";
import { makeQueryString } from "../utils/url";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import { HenesisKeys } from "./henesisKeys";
import {
  Blockchain,
  CreateInactiveMasterWalletRequest,
  InactiveMasterWalletDTO,
  MasterWalletDTO,
} from "../__generate__/eth";
import { InactiveMasterWallet, InactiveWallet } from "../wallet";
import { parseVersion } from "../utils/wallet";

export class EthWallets extends Wallets<EthMasterWallet> {
  private readonly henesisKey: HenesisKeys;
  private readonly blockchain: BlockchainType;

  constructor(
    client: Client,
    keychains: Keychains,
    env: Env,
    henesisKey: HenesisKeys,
    blockchain: BlockchainType
  ) {
    super(env, client, keychains);
    this.henesisKey = henesisKey;
    this.blockchain = blockchain;
  }

  canUseDepositAddress(versionStr: string): boolean {
    const version = parseVersion(versionStr);
    switch (this.blockchain) {
      case BlockchainType.ETHEREUM:
        return version >= 4;
      case BlockchainType.KLAYTN:
        return false;
      case BlockchainType.BINANCE_SMART_CHAIN:
        return false;
      case BlockchainType.POLYGON:
        return false;
      default:
        throw new Error("not supported blockchain " + this.blockchain);
    }
  }

  canUseUserWallet(versionStr: string): boolean {
    return !this.canUseDepositAddress(versionStr);
  }

  async getMasterWallet(id: string): Promise<EthMasterWallet> {
    const walletData = await this.client.get<NoUndefinedField<MasterWalletDTO>>(
      `${this.baseUrl}/${id}`
    );
    if (!this.canUseUserWallet(walletData.version)) {
      throw new Error("This wallet is not a compatible version.");
    }
    return new EthMasterWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }

  async getWallet(id: string): Promise<EthWallet> {
    const walletData = await this.client.get<NoUndefinedField<MasterWalletDTO>>(
      `${this.baseUrl}/${id}`
    );
    if (!this.canUseDepositAddress(walletData.version)) {
      throw new Error(
        "This wallet is not a compatible version. Please use the v2 APIs."
      );
    }
    return new EthWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }

  async getWallets(options?: WalletSearchOptions): Promise<EthWallet[]> {
    const queryString = makeQueryString(options);
    const walletDatas = await this.client.get<
      NoUndefinedField<MasterWalletDTO>[]
    >(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);

    return walletDatas
      .filter((walletData) => {
        return this.canUseDepositAddress(walletData.version);
      })
      .map((walletData) => {
        return new EthWallet(
          this.client,
          transformMasterWalletData(walletData),
          this.keychains,
          this.blockchain
        );
      });
  }

  async getAllWallets(
    options?: WalletSearchOptions
  ): Promise<Array<EthWallet | EthMasterWallet>> {
    const queryString = makeQueryString(options);
    const walletDatas = await this.client.get<
      NoUndefinedField<MasterWalletDTO>[]
    >(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);

    return walletDatas.map((walletData) => {
      const { version, blockchain } = walletData;
      if (blockchain === Blockchain.KLAYTN) {
        return new EthMasterWallet(
          this.client,
          transformMasterWalletData(walletData),
          this.keychains,
          this.blockchain
        );
      }
      if (this.canUseUserWallet(version)) {
        return new EthMasterWallet(
          this.client,
          transformMasterWalletData(walletData),
          this.keychains,
          this.blockchain
        );
      }
      return new EthWallet(
        this.client,
        transformMasterWalletData(walletData),
        this.keychains,
        this.blockchain
      );
    });
  }

  async getMasterWallets(
    options?: WalletSearchOptions
  ): Promise<EthMasterWallet[]> {
    const queryString = makeQueryString(options);
    const walletDatas = await this.client.get<
      NoUndefinedField<MasterWalletDTO>[]
    >(`${this.baseUrl}${queryString ? `?${queryString}` : ""}`);

    return walletDatas
      .filter((walletData) => this.canUseUserWallet(walletData.version))
      .map(
        (walletData) =>
          new EthMasterWallet(
            this.client,
            transformMasterWalletData(walletData),
            this.keychains,
            this.blockchain
          )
      );
  }

  // todo: henesis-keys
  async createRecoveryKit(
    name: string,
    passphrase: string
  ): Promise<RecoveryKit> {
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer = this.createEncryptionKey(passphrase);
    const henesisKey = await this.henesisKey.getHenesisKey();

    // eslint-disable-next-line new-cap
    const aes = new aesjs.ModeOfOperation.ctr(encryptionKeyBuffer);
    const encryptedPassphrase = aesjs.utils.hex.fromBytes(
      aes.encrypt(aesjs.utils.utf8.toBytes(passphrase))
    );

    return new RecoveryKit(
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

  async createMasterWalletWithKit(
    recoveryKit: RecoveryKit
  ): Promise<EthMasterWallet> {
    const walletData = await this.client.post<
      NoUndefinedField<MasterWalletDTO>
    >(this.baseUrl, {
      name: recoveryKit.getName(),
      accountKey: this.removePrivateKey(recoveryKit.getAccountKey()),
      backupKey: this.removeKeyFile(
        this.removePrivateKey(recoveryKit.getBackupKey())
      ),
      encryptionKey: recoveryKit.getEncryptionKey(),
    });

    return new EthMasterWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }

  async createMasterWallet(
    name: string,
    passphrase: string,
    gasPrice?: BN
  ): Promise<EthMasterWallet> {
    checkNullAndUndefinedParameter({ name, passphrase });
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const walletData = await this.client.post<
      NoUndefinedField<MasterWalletDTO>
    >(this.baseUrl, {
      name,
      blockchain: this.blockchain,
      accountKey: this.removePrivateKey(accountKey),
      backupKey: this.removeKeyFile(this.removePrivateKey(backupKey)),
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
    });

    return new EthMasterWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }

  async retryCreateMasterWallet(walletId: string, gasPrice?: BN) {
    checkNullAndUndefinedParameter({ walletId });
    const response = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/${walletId}/recreate`,
      {
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      }
    );

    return new EthMasterWallet(
      this.client,
      transformMasterWalletData(response),
      this.keychains,
      this.blockchain
    );
  }

  verifyAddress(address: string): boolean {
    if (!/^(0x|0X)?[0-9a-fA-F]{40}$/i.test(address)) {
      return false;
    }

    const lowerCaseAddress = address.toLowerCase();
    const checksumAddress = toChecksum(lowerCaseAddress);
    const addressHash = keccak256s(lowerCaseAddress.slice(2));
    for (let i = 0; i < 40; i++) {
      if (
        (parseInt(addressHash[i + 2], 16) > 7 &&
          lowerCaseAddress[i + 2].toUpperCase() !== checksumAddress[i + 2]) ||
        (parseInt(addressHash[i + 2], 16) <= 7 &&
          lowerCaseAddress[i + 2].toLowerCase() !== checksumAddress[i + 2])
      ) {
        return false;
      }
    }

    return true;
  }

  async createInactiveMasterWallet(
    name: string
  ): Promise<InactiveMasterWallet> {
    checkNullAndUndefinedParameter({ name });
    const params: CreateInactiveMasterWalletRequest = {
      name,
      encryptionKey: this.createDummyEncryptionKey(),
    };
    const masterWalletResponse =
      await this.client.post<InactiveMasterWalletDTO>(
        `${this.baseUrl}?type=inactive`,
        params
      );
    const {
      id,
      name: walletName,
      blockchain,
      henesisKey,
      status,
      createdAt,
      updatedAt,
    } = masterWalletResponse;
    return {
      id,
      name: walletName,
      blockchain: transformBlockchainType(blockchain),
      henesisKey,
      status,
      createdAt,
      updatedAt,
    };
  }

  async createWalletWithKit(recoveryKit: RecoveryKit): Promise<EthWallet> {
    const walletData = await this.client.post<
      NoUndefinedField<MasterWalletDTO>
    >(this.baseUrl, {
      name: recoveryKit.getName(),
      accountKey: recoveryKit.getAccountKey(),
      backupKey: this.removeKeyFile(recoveryKit.getBackupKey()),
      encryptionKey: recoveryKit.getEncryptionKey(),
    });

    return new EthWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }

  async createWallet(
    name: string,
    passphrase: string,
    gasPrice?: BN
  ): Promise<EthWallet> {
    checkNullAndUndefinedParameter({ name, passphrase });
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const walletData = await this.client.post<
      NoUndefinedField<MasterWalletDTO>
    >(this.baseUrl, {
      name,
      blockchain: this.blockchain,
      accountKey: this.removePrivateKey(accountKey),
      backupKey: this.removeKeyFile(this.removePrivateKey(backupKey)),
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
    });

    return new EthWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }

  async retryCreateWallet(walletId: string, gasPrice?: BN) {
    checkNullAndUndefinedParameter({ walletId });
    const response = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/${walletId}/recreate`,
      {
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      }
    );

    return new EthWallet(
      this.client,
      transformMasterWalletData(response),
      this.keychains,
      this.blockchain
    );
  }

  async createInactiveWallet(name: string): Promise<InactiveWallet> {
    checkNullAndUndefinedParameter({ name });
    const params: CreateInactiveMasterWalletRequest = {
      name,
      encryptionKey: this.createDummyEncryptionKey(),
    };
    const masterWalletResponse =
      await this.client.post<InactiveMasterWalletDTO>(
        `${this.baseUrl}?type=inactive`,
        params
      );
    const {
      id,
      name: walletName,
      blockchain,
      henesisKey,
      status,
      createdAt,
      updatedAt,
    } = masterWalletResponse;
    return {
      id,
      name: walletName,
      blockchain: transformBlockchainType(blockchain),
      henesisKey,
      status,
      createdAt,
      updatedAt,
    };
  }

  async createVersionedMasterWalletWithKit(
    recoveryKit: RecoveryKit,
    version: string
  ): Promise<EthWallet> {
    const walletData = await this.client.post<
      NoUndefinedField<MasterWalletDTO>
    >(`/admin/master-wallets`, {
      name: recoveryKit.getName(),
      accountKey: recoveryKit.getAccountKey(),
      backupKey: this.removeKeyFile(recoveryKit.getBackupKey()),
      encryptionKey: recoveryKit.getEncryptionKey(),
      version: version,
    });

    return new EthWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }

  async createVersionedMasterWallet(
    name: string,
    passphrase: string,
    version: string,
    gasPrice?: BN
  ): Promise<EthMasterWallet> {
    checkNullAndUndefinedParameter({ name, passphrase });
    const accountKey = this.keychains.create(passphrase);
    const backupKey = this.keychains.create(passphrase);
    const encryptionKeyBuffer: Buffer = this.createEncryptionKey(passphrase);
    const walletData = await this.client.post<
      NoUndefinedField<MasterWalletDTO>
    >(`/admin/master-wallets`, {
      name,
      blockchain: this.blockchain,
      accountKey: this.removePrivateKey(accountKey),
      backupKey: this.removeKeyFile(this.removePrivateKey(backupKey)),
      encryptionKey: aesjs.utils.hex.fromBytes(encryptionKeyBuffer),
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      version: version,
    });

    return new EthMasterWallet(
      this.client,
      transformMasterWalletData(walletData),
      this.keychains,
      this.blockchain
    );
  }
}
