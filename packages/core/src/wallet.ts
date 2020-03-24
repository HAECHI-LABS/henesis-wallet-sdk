import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import BN from 'bn.js';
import { Client } from './sdk';
import {
  Coin, Erc20, HalfSignedTransaction, MultiSigPayload,
} from './coin';
import { Key, Keychains } from './keychains';
import { Blockchain } from './blockchain';
import { Factory, GlobalCoinFactoryGenerator } from './factory';
import wallet from './contracts/MasterWallet.json';

const Bytes = require('./vendor/eth-lib/bytes');
const { keccak256 } = require('./vendor/eth-lib/hash');

export interface Nonce {
  nonce: BN;
}

export interface Balance {
  balance: BN;
}

export interface Transaction {
  id: string;
  blockchain: Blockchain;
  walletId: string;
  accountId: string;
  hash: string;
  status: string;
}

export interface WalletData {
  id: string;
  name: string;
  address: string;
  blockchain: Blockchain;
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

  abstract getChain(): Blockchain;

  abstract verifyAddress(address: string): boolean;

  abstract isValidAddress(address: string): boolean;

  abstract transfer(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string
  ): Promise<Transaction>;

  abstract contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string
  ): Promise<Transaction>;

  abstract getBalance(): Promise<BN>;

  abstract getAddress(): string;

  abstract tokenBalance(ticker: string): Promise<BN>;
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

  getChain(): Blockchain {
    return this.masterWalletData.blockchain;
  }

  isValidAddress(address: string): boolean {
    return false;
  }

  async contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
  ): Promise<Transaction> {
    const nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce,
      value,
      toAddress: contractAddress,
      walletAddress: this.getAddress(),
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
      this.masterWalletData.blockchain,
      payload,
      this.masterWalletData.accountKey.keyFile,
      passphrase,
    );
  }

  protected sendTransaction(halfSignedTransaction: HalfSignedTransaction) {
    return this.client
      .post<Transaction>(
        `${this.baseUrl}/transactions`,
        {
          walletId: this.masterWalletData.id,
          signature: halfSignedTransaction.signature,
          blockchain: halfSignedTransaction.blockchain,
          multiSigPayload: {
            hexData: halfSignedTransaction.multiSigPayload.hexData,
            walletNonce: halfSignedTransaction.multiSigPayload.walletNonce.toString(10),
            value: halfSignedTransaction.multiSigPayload.value.toString(10),
            toAddress: halfSignedTransaction.multiSigPayload.toAddress,
            walletAddress: halfSignedTransaction.multiSigPayload.walletAddress,
          },
        },
      );
  }

  async transfer(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string,
  ): Promise<Transaction> {
    const coin: Coin = this.coinFactory.get(ticker);
    const hexData = coin.buildData(to, amount);
    const nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData,
      walletNonce: nonce,
      value: new BN(0),
      toAddress: this.getAddress(),
      walletAddress: this.getAddress(),
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

  async getNonce(): Promise<BN> {
    const nonce: Nonce = await this.client
      .get<Nonce>(`${this.baseUrl}/${this.masterWalletData.id}/nonce`);
    return new BN(nonce.nonce);
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

  async createUserWallet(name: string, passphrase: string, salt?: BN): Promise<UserWallet> {
    const nonce = await this.getNonce();
    // generates 32byte(256 bit) randoma hex string and converts to BN when salt is not defined
    if (!salt) {
      salt = Web3.utils.toBN(Web3.utils.randomHex(32));
    }
    const data = this.wallet.methods.createUserWallet(salt).encodeABI();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce,
      value: new BN(0),
      toAddress: this.getAddress(),
      walletAddress: this.getAddress(),
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
          salt: salt.toString(10),
          signature,
          blockchain: this.getChain(),
          multiSigPayload: {
            hexData: data,
            walletNonce: multiSigPayload.walletNonce.toString(10),
            value: multiSigPayload.value.toString(10),
            toAddress: multiSigPayload.toAddress,
            walletAddress: multiSigPayload.walletAddress,
          },
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

  async getBalance(): Promise<BN> {
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/balance`);
    return new BN(balance.balance);
  }

  async tokenBalance(ticker: string): Promise<BN> {
    const coin: Coin = this.coinFactory.get(ticker);
    if (!coin.isErc20()) {
      throw new Error(`${ticker} is not erc20 token`);
    }
    const address: string = (coin as Erc20).getAddress();
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/tokenBalance?address=${address}`);
    return balance.balance;
  }

  getAddress(): string {
    return this.masterWalletData.address;
  }

  getData(): MasterWalletData {
    return this.masterWalletData;
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
    const nonce: Nonce = await this.client
      .get<Nonce>(`${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/nonce`);
    return new BN(nonce.nonce);
  }

  async getBalance(): Promise<BN> {
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/balance`);
    return new BN(balance.balance);
  }

  async tokenBalance(ticker: string): Promise<BN> {
    const coin: Coin = this.coinFactory.get(ticker);
    if (!coin.isErc20()) {
      throw new Error(`${ticker} is not erc20 token`);
    }
    const address: string = (coin as Erc20).getAddress();
    const balance: Balance = await this.client
      .get<Balance>(`${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/tokenBalance?address=${address}`);
    return new BN(balance.balance);
  }

  getAddress(): string {
    return this.userWalletData.address;
  }

  getData(): UserWalletData {
    return this.userWalletData;
  }
}
