import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Client } from './sdk';
import {
  Coin, Erc20, HalfSignedTransaction, MultiSigPayload,
} from './coin';
import { Key, Keychains } from './keychains';
import { Factory, GlobalCoinFactoryGenerator } from './factory';
import wallet from './contracts/MasterWallet.json';

const Bytes = require('./vendor/eth-lib/bytes');
const { keccak256 } = require('./vendor/eth-lib/hash');

export interface Nonce {
  nonce: number;
}

export interface Balance {
  balance: number;
}

export interface Transaction {
  id: string;
  blockchain: string;
  walletId: string;
  accountId: string;
  hash: string;
  status: string;
}

export interface WalletData {
  id: string;
  name: string;
  address: string;
  blockchain: string;
  createdAt: string;
}

export interface MasterWalletData extends WalletData {
  backupKey: Key;
  accountKey: Key;
}

export interface UserWalletData extends WalletData {

}

export abstract class Wallet {
  protected readonly client: Client;

  protected readonly baseUrl = '/wallets';

  protected readonly keychains: Keychains;

  protected readonly coinFactory: Factory<Coin>;

  protected constructor(
    client: Client,
    keychains: Keychains,
    coinFactory: Factory<Coin>,
  ) {
    this.client = client;
    this.keychains = keychains;
    this.coinFactory = coinFactory;
  }

  abstract getChain(): string;

  abstract verifyAddress(address: string): boolean;

  abstract isValidAddress(address: string): boolean;

  abstract transfer(
    ticker: string,
    to: string,
    amount: number,
    passphrase: string
  ): Promise<Transaction>;

  abstract contractCall(
    contractAddress: string,
    value: number,
    data: string,
    passphrase: string
  ): Promise<Transaction>;

  abstract getBalance(): Promise<number>;

  abstract tokenBalance(ticker: string): Promise<number>;
}

export abstract class EthLikeWallet extends Wallet {
  protected masterWalletData: MasterWalletData;

  protected constructor(
    client: Client,
    masterWalletData: MasterWalletData,
    keychains: Keychains,
  ) {
    super(client, keychains, GlobalCoinFactoryGenerator.get(masterWalletData.blockchain));
    this.masterWalletData = masterWalletData;
  }

  verifyAddress(address: string): boolean {
    return false;
  }

  getChain(): string {
    return this.masterWalletData.blockchain;
  }

  isValidAddress(address: string): boolean {
    return false;
  }

  async contractCall(
    contractAddress: string,
    value: number,
    data: string,
    passphrase: string,
  ): Promise<Transaction> {
    const nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce,
      value,
      toAddress: this.masterWalletData.address,
      walletAddress: this.masterWalletData.address,
    };

    const signature = this.signPayload(
      multiSigPayload,
      passphrase,
    );

    return this.sendTransaction({
      signature,
      blockchain: this.getChain(),
      multiSigPayload,
    });
  }

  protected signPayload(multiSigPayload: MultiSigPayload, passphrase: string) {
    const payload = `0x${
      multiSigPayload.walletAddress.toLowerCase().slice(2)
    }${multiSigPayload.toAddress.toLowerCase().slice(2)
    }${Bytes.pad(32, Bytes.fromNat(`0x${multiSigPayload.value.toString(16)}`)).slice(2)
    }${Bytes.pad(32, Bytes.fromNat(`0x${multiSigPayload.walletNonce.toString(16)}`)).slice(2)
    }${multiSigPayload.hexData.slice(2)}`;

    return this.keychains.signPayload(
      payload,
      this.masterWalletData.accountKey.keyFile,
      passphrase,
    );
  }

  protected sendTransaction(halfSignedTransaction: HalfSignedTransaction) {
    return this.client
      .post<Transaction>(
        `${this.baseUrl}/transactions`,
        halfSignedTransaction,
      );
  }

  async transfer(
    ticker: string,
    to: string,
    amount: number,
    passphrase: string,
  ): Promise<Transaction> {
    const coin: Coin = this.coinFactory.get(ticker);
    const hexData = coin.buildData(to, amount);
    const nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData,
      walletNonce: nonce,
      value: 0,
      toAddress: this.masterWalletData.address,
      walletAddress: this.masterWalletData.address,
    };

    const signature = this.signPayload(
      multiSigPayload,
      passphrase,
    );

    return this.sendTransaction({
      signature,
      blockchain: this.getChain(),
      multiSigPayload,
    });
  }

  async getNonce(): Promise<number> {
    const nonce: Nonce = await this.client
      .get<Nonce>(`${this.baseUrl}/${this.masterWalletData.id}/nonce`);
    return nonce.nonce;
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
    this.wallet = new new Web3().eth.Contract((wallet as AbiItem[]));
  }

  async createUserWallet(name: string, createNonce: number, passphrase: string): Promise<UserWallet> {
    const nonce = await this.getNonce();
    const data = this.wallet.methods.createUserWallet(createNonce).encodeABI();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce,
      value: 0,
      toAddress: this.masterWalletData.address,
      walletAddress: this.masterWalletData.address,
    };

    const signature = this.signPayload(
      multiSigPayload,
      passphrase,
    );

    const userWalletData = await this.client
      .post<UserWalletData>(
        `${this.baseUrl}/${this.masterWalletData.id}/user-wallets`,
        {
          name,
          signature,
          blockchain: this.getChain(),
          multiSigPayload,
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
    const userWalletData = await this.client
      .get<UserWalletData>(`${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${walletId}`);
    return new UserWallet(
      this.client,
      this.masterWalletData,
      this.keychains,
      userWalletData,
    );
  }

  async getBalance(): Promise<number> {
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/balance`);
    return balance.balance;
  }

  async tokenBalance(ticker: string): Promise<number> {
    const coin: Coin = this.coinFactory.get(ticker);
    if (!coin.isErc20()) {
      throw new Error(`${ticker} is not erc20 token`);
    }
    const address: string = (coin as Erc20).getAddress();
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/tokenBalance?address=${address}`);
    return balance.balance;
  }

  getAddress() {
    return this.masterWalletData.address;
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

  async getNonce(): Promise<number> {
    const nonce: Nonce = await this.client
      .get<Nonce>(`${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/nonce`);
    return nonce.nonce;
  }

  async getBalance(): Promise<number> {
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/balance`);
    return balance.balance;
  }

  async tokenBalance(ticker: string): Promise<number> {
    const coin: Coin = this.coinFactory.get(ticker);
    if (!coin.isErc20()) {
      throw new Error(`${ticker} is not erc20 token`);
    }
    const address: string = (coin as Erc20).getAddress();
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/tokenBalance?address=${address}`);
    return balance.balance;
  }

  getAddress() {
    return this.userWalletData.address;
  }
}
