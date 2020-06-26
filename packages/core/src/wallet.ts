import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BN from 'bn.js';
import aesjs from 'aes-js';
import { Base64 } from 'js-base64';
import { Client } from './sdk';
import {
  PaginationOptions,
  Pagination,
  Key,
  KeyWithPriv,
  Balance,
} from './types';
import { Keychains } from './keychains';
import { BlockchainType } from './blockchain';
import wallet from './contracts/MasterWallet.json';
import { BNConverter, ObjectConverter, toChecksum } from './utils';
import { MultiSigPayload, SignedMultiSigPayload } from './transactions';
import BatchRequest from './batch';
import { Coin } from './coin';
import { Coins } from './coins';

const Bytes = require('./vendor/eth-lib/bytes');
const { keccak256s } = require('./vendor/eth-lib/hash');

export interface Nonce {
  nonce: BN;
}

export enum WalletStatus {
  Creating = 'CREATING',
  Active = 'ACTIVE',
}

export interface Transaction {
  id: string;
  blockchain: BlockchainType;
  walletId: string;
  hash: string;
  status: string;
}

export interface WalletData {
  id: string;
  name: string;
  address: string;
  blockchain: BlockchainType;
  createdAt: string;
  status: WalletStatus;
  transactionId: string | null;
  error: string | null;
}

export interface MasterWalletData extends WalletData {
  backupKey: Key;
  accountKey: Key;
  encryptionKey: string;
}

export interface UserWalletData extends WalletData {}

export interface UserWalletPaginationOptions extends PaginationOptions {
  name?: string;
  id?: string;
  ids?: string[];
  address?: string;
}

function convertSignedMultiSigPayloadToDTO(
  signedMultiSigPayload: SignedMultiSigPayload,
) {
  return {
    signature: signedMultiSigPayload.signature,
    multiSigPayload: {
      hexData: signedMultiSigPayload.multiSigPayload.hexData,
      walletNonce: BNConverter.bnToHexString(
        signedMultiSigPayload.multiSigPayload.walletNonce,
      ),
      value: BNConverter.bnToHexString(
        signedMultiSigPayload.multiSigPayload.value,
      ),
      toAddress: signedMultiSigPayload.multiSigPayload.toAddress,
      walletAddress: signedMultiSigPayload.multiSigPayload.walletAddress,
    },
  };
}

export abstract class Wallet {
  protected readonly client: Client;

  protected readonly baseUrl = '/wallets';

  protected readonly keychains: Keychains;

  protected readonly coins: Coins;

  protected constructor(client: Client, keychains: Keychains) {
    this.client = client;
    this.keychains = keychains;
    this.coins = new Coins(this.client);
  }

  abstract getChain(): BlockchainType;

  abstract verifyAddress(address: string): boolean;

  abstract transfer(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
  ): Promise<Transaction>;

  abstract replaceTransaction(
    transactionId: string,
    otpCode?: string,
  ): Promise<Transaction>;

  abstract contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
    otpCode?: string,
  ): Promise<Transaction>;

  abstract getBalance(): Promise<Balance[]>;

  abstract getAddress(): string;

  abstract getId(): string;

  abstract changeName(name: string);
}

export abstract class EthLikeWallet extends Wallet {
  protected masterWalletData: MasterWalletData;
  protected readonly DEFAULT_CONTRACT_CALL_GAS_LIMIT: BN = new BN(1000000);
  protected readonly DEFAULT_COIN_TRANSFER_GAS_LIMIT: BN = new BN(150000);
  protected readonly DEFAULT_TOKEN_TRANSFER_GAS_LIMIT: BN = new BN(500000);

  protected constructor(
    client: Client,
    masterWalletData: MasterWalletData,
    keychains: Keychains,
  ) {
    super(client, keychains);
    this.masterWalletData = masterWalletData;
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

  getChain(): BlockchainType {
    return this.masterWalletData.blockchain;
  }

  async replaceTransaction(
    transactionId: string,
    otpCode?: string,
  ): Promise<Transaction> {
    const walletId = this.getId();
    const blockchain = this.getChain();
    return this.client.post<Transaction>(`${this.baseUrl}/transactions`, {
      walletId,
      transactionId,
      blockchain,
      otpCode,
    });
  }

  async contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
  ): Promise<Transaction> {
    return this.sendTransaction(
      this.getChain(),
      await this.buildContractCallPayload(
        contractAddress,
        value,
        data,
        passphrase,
      ),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT,
    );
  }

  public async buildContractCallPayload(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
  ): Promise<SignedMultiSigPayload> {
    const nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce,
      value,
      toAddress: contractAddress,
      walletAddress: this.getAddress(),
    };

    const signature = this.signPayload(multiSigPayload, passphrase);

    return {
      signature,
      multiSigPayload,
    };
  }

  async transfer(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
  ): Promise<Transaction> {
    return this.sendTransaction(
      this.getChain(),
      await this.buildTransferPayload(ticker, to, amount, passphrase),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.getGasLimitByTicker(ticker),
    );
  }

  public async buildTransferPayload(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string,
  ): Promise<SignedMultiSigPayload> {
    const coin: Coin = await this.coins.getCoin(ticker, this.getChain());
    const hexData = coin.buildTransferData(to, amount);
    const nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData,
      walletNonce: nonce,
      value: BNConverter.hexStringToBN('0x0'),
      toAddress: this.getAddress(),
      walletAddress: this.getAddress(),
    };

    const signature = this.signPayload(multiSigPayload, passphrase);

    return {
      signature,
      multiSigPayload,
    };
  }

  public createBatchRequest(otpCode?: string) {
    return new BatchRequest(
      (signedMultiSigPayloads): Promise<Transaction[]> =>
        this.sendBatchTransaction(
          this.getChain(),
          signedMultiSigPayloads,
          this.getId(),
          otpCode,
        ),
    );
  }

  protected signPayload(multiSigPayload: MultiSigPayload, passphrase: string) {
    const payload = `0x${multiSigPayload.walletAddress
      .toLowerCase()
      .slice(2)}${multiSigPayload.toAddress.toLowerCase().slice(2)}${Bytes.pad(
      32,
      Bytes.fromNat(`0x${multiSigPayload.value.toString(16)}`),
    ).slice(2)}${Bytes.pad(
      32,
      Bytes.fromNat(`0x${multiSigPayload.walletNonce.toString(16)}`),
    ).slice(2)}${multiSigPayload.hexData.slice(2)}`;

    return this.keychains.signPayload(
      this.masterWalletData.blockchain,
      payload,
      this.masterWalletData.accountKey.keyFile,
      passphrase,
    );
  }

  protected sendTransaction(
    blockchain: string,
    signedMultiSigPayload: SignedMultiSigPayload,
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
  ) {
    return this.client.post<Transaction>(`${this.baseUrl}/transactions`, {
      walletId,
      blockchain,
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload,
      ),
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
      otpCode,
    });
  }

  protected async sendBatchTransaction(
    blockchain: string,
    signedMultiSigPayloads: SignedMultiSigPayload[],
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
  ): Promise<Transaction[]> {
    const signedMultiSigPayloadDTOs = signedMultiSigPayloads.map(
      (signedMultiSigPayload) =>
        convertSignedMultiSigPayloadToDTO(signedMultiSigPayload),
    );
    return this.client.post<Transaction[]>(
      `${this.baseUrl}/batch-transactions`,
      {
        walletId,
        blockchain,
        signedMultiSigPayloads: signedMultiSigPayloadDTOs,
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
        gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
        otpCode,
      },
    );
  }

  async getNonce(): Promise<BN> {
    const nonce: {
      nonce: string;
    } = await this.client.get(
      `${this.baseUrl}/${this.masterWalletData.id}/nonce`,
    );
    return BNConverter.hexStringToBN(nonce.nonce);
  }

  protected getGasLimitByTicker(ticker: string): BN {
    if (ticker.toUpperCase() === 'ETH' || ticker.toUpperCase() === 'KLAY') {
      return this.DEFAULT_COIN_TRANSFER_GAS_LIMIT;
    }
    return this.DEFAULT_TOKEN_TRANSFER_GAS_LIMIT;
  }
}

export class MasterWallet extends EthLikeWallet {
  private wallet: Contract;

  public constructor(
    client: Client,
    walletData: MasterWalletData,
    keychains: Keychains,
  ) {
    super(client, walletData, keychains);
    this.wallet = new new Web3().eth.Contract(wallet as AbiItem[]);
  }

  async restorePassphrase(
    encryptedPassphrase: string,
    newPassphrase: string,
    otpCode?: string,
  ): Promise<void> {
    const passphrase = this.recoverPassphrase(encryptedPassphrase);
    const initialKey: Key = await this.client.get<Key>(
      `${this.baseUrl}/${this.masterWalletData.id}/initial-key`,
    );
    await this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      initialKey,
      otpCode,
    );
  }

  private recoverPassphrase(encryptedPassphrase: string): string {
    const { encryptionKey } = this.masterWalletData;
    const aesCtr = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKey),
    );
    const decryptedBytes = aesCtr.decrypt(
      aesjs.utils.hex.toBytes(Base64.decode(encryptedPassphrase)),
    );
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async verifyEncryptedPassphrase(
    encryptedPassphrase: string,
  ): Promise<boolean> {
    const passphrase = this.recoverPassphrase(encryptedPassphrase);
    const initialKey: Key = await this.client.get<Key>(
      `${this.baseUrl}/${this.masterWalletData.id}/initial-key`,
    );
    return await this.verifyPassphraseWithKeyFile(passphrase, initialKey);
  }

  async verifyPassphrase(passphrase: string): Promise<boolean> {
    return this.verifyPassphraseWithKeyFile(passphrase);
  }

  private async verifyPassphraseWithKeyFile(
    passphrase: string,
    initialKey?: Key,
  ): Promise<boolean> {
    try {
      this.keychains.decryptKeyFile(
        initialKey
          ? initialKey.keyFile
          : this.masterWalletData.accountKey.keyFile,
        passphrase,
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async changePassphrase(
    passphrase: string,
    newPassphrase: string,
    otpCode?: string,
  ): Promise<void> {
    return this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      undefined,
      otpCode,
    );
  }

  async changePassphraseWithKeyFile(
    passphrase: string,
    newPassphrase: string,
    initialKey?: Key,
    otpCode?: string,
  ): Promise<void> {
    const newKey: KeyWithPriv = this.keychains.changePassword(
      initialKey
        ? initialKey.keyFile
        : this.masterWalletData.accountKey.keyFile,
      passphrase,
      newPassphrase,
    );

    this.masterWalletData.accountKey = await this.client.patch<Key>(
      `${this.baseUrl}/${this.masterWalletData.id}/account-key`,
      {
        keyFile: newKey.keyFile,
        otpCode,
      },
    );
  }

  async createUserWallet(
    name: string,
    passphrase: string,
    gasPrice?: BN,
    salt?: BN,
  ): Promise<UserWallet> {
    const nonce = await this.getNonce();
    // generates 32byte(256 bit) randoma hex string and converts to BN when salt is not defined
    if (salt === undefined) {
      salt = Web3.utils.toBN(Web3.utils.randomHex(32));
    }
    const data = this.wallet.methods.createUserWallet(salt).encodeABI();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce,
      value: BNConverter.hexStringToBN('0x0'),
      toAddress: this.getAddress(),
      walletAddress: this.getAddress(),
    };

    const signature = this.signPayload(multiSigPayload, passphrase);

    const signedMultiSigPayload = {
      signature,
      multiSigPayload,
    };

    const userWalletData = await this.client.post<UserWalletData>(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets`,
      {
        name,
        salt: BNConverter.bnToHexString(salt),
        blockchain: this.getChain(),
        signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
          signedMultiSigPayload,
        ),
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      },
    );

    return new UserWallet(
      this.client,
      this.masterWalletData,
      this.keychains,
      userWalletData,
    );
  }

  async getUserWallet(walletId: string): Promise<UserWallet> {
    const userWalletData = await this.client.get<UserWalletData>(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${walletId}`,
    );
    return new UserWallet(
      this.client,
      this.masterWalletData,
      this.keychains,
      userWalletData,
    );
  }

  async getBalance(): Promise<Balance[]> {
    const balances: {
      coinType: string;
      amount: string;
      name: string;
      symbol: string;
    }[] = await this.client.get(
      `${this.baseUrl}/${this.masterWalletData.id}/balance`,
    );

    return balances.map((balance) => ({
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(balance.amount),
      coinType: balance.coinType,
      name: balance.name,
    }));
  }

  getAddress(): string {
    return this.masterWalletData.address;
  }

  getData(): MasterWalletData {
    return this.masterWalletData;
  }

  async getUserWallets(
    options?: UserWalletPaginationOptions,
  ): Promise<Pagination<UserWallet>> {
    const queryString: string = options
      ? Object.keys(ObjectConverter.toSnakeCase(options))
          .filter((key) => !!options[key])
          .map((key) => `${key}=${ObjectConverter.toSnakeCase(options)[key]}`)
          .join('&')
      : '';

    const data: Pagination<UserWalletData> = await this.client.get<
      Pagination<UserWalletData>
    >(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets?${queryString}`,
    );

    return {
      pagination: data.pagination,
      results: data.results.map(
        (data) =>
          new UserWallet(
            this.client,
            this.masterWalletData,
            this.keychains,
            data,
          ),
      ),
    } as Pagination<UserWallet>;
  }

  getId(): string {
    return this.masterWalletData.id;
  }

  async changeName(name: string) {
    const masterWalletData: MasterWalletData = await this.client.patch<
      MasterWalletData
    >(`${this.baseUrl}/${this.masterWalletData.id}/name`, {
      name,
    });
    this.masterWalletData.name = masterWalletData.name;
  }

  async flush(
    coinType: string,
    userWalletIds: string[],
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
  ) {
    if (userWalletIds.length > 50) {
      throw new Error(`only 50 accounts can be flushed at a time`);
    }
    const coin: Coin = await this.coins.getCoin(coinType, this.getChain());
    const userWallets: Pagination<UserWallet> = await this.getUserWallets({
      ids: userWalletIds,
      size: userWalletIds.length,
    });
    const nonce = await this.getNonce();
    const userWalletAddresses = userWallets.results.map((userWallet) =>
      userWallet.getAddress(),
    );

    if (userWalletIds.length != userWalletAddresses.length) {
      throw new Error(`your input user wallet idd count is ${userWalletIds.length}. but matched user wallet count is ${userWalletAddresses.length}`)
    }

    const multiSigPayload: MultiSigPayload = {
      hexData: coin.buildFlushData(
        userWalletAddresses,
        coin.getCoinData().address,
      ),
      walletNonce: nonce,
      value: BNConverter.hexStringToBN('0x0'),
      toAddress: this.getAddress(),
      walletAddress: this.getAddress(),
    };

    const signature = this.signPayload(multiSigPayload, passphrase);

    const signedMultiSigPayload = {
      signature,
      multiSigPayload,
    };

    return this.sendTransaction(
      this.getChain(),
      signedMultiSigPayload,
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT,
    );
  }
}

export class UserWallet extends EthLikeWallet {
  private readonly userWalletData: UserWalletData;

  public constructor(
    client: Client,
    walletData: MasterWalletData,
    keychains: Keychains,
    userWalletData: UserWalletData,
  ) {
    super(client, walletData, keychains);
    this.userWalletData = userWalletData;
  }

  async getNonce(): Promise<BN> {
    const nonce: {
      nonce: string;
    } = await this.client.get(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/nonce`,
    );
    return BNConverter.hexStringToBN(nonce.nonce);
  }

  async getBalance(): Promise<Balance[]> {
    const balances: {
      coinType: string;
      amount: string;
      name: string;
      symbol: string;
    }[] = await this.client.get(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/balance`,
    );

    return balances.map((balance) => ({
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(balance.amount),
      coinType: balance.coinType,
      name: balance.name,
    }));
  }

  getAddress(): string {
    return this.userWalletData.address;
  }

  getData(): UserWalletData {
    return this.userWalletData;
  }

  getId(): string {
    return this.userWalletData.id;
  }

  async changeName(name: string) {
    const userWalletData: UserWalletData = await this.client.patch<
      UserWalletData
    >(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/name`,
      {
        name,
      },
    );
    this.userWalletData.name = userWalletData.name;
  }
}
