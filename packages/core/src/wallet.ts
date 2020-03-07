import {Client} from './sdk';
import {Coin, HalfSignedTransaction, MultiSigPayload} from './coin';
import {Key, Keychains} from './keychains';
import {Factory, GlobalCoinFactoryGenerator} from './factory';
import {Contract} from 'web3-eth-contract';
import wallet from './contracts/MasterWallet.json';
import Web3 from 'web3';
import {AbiItem} from 'web3-utils';

const Bytes = require('./vendor/eth-lib/bytes');

export interface Nonce {
  nonce: number;
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
  walletType: string;
  address: string;
  blockchain: string;
  createdAt: string;
  backupKey: Key;
  accountKey: Key;
}

export abstract class Wallet {
  protected readonly client: Client;

  protected readonly baseUrl = '/wallets';

  protected readonly walletData: WalletData;

  protected readonly keychains: Keychains;

  protected readonly coinFactory: Factory<Coin>;

  protected constructor(
    client: Client,
    walletData: WalletData,
    keychains: Keychains,
    coinFactory: Factory<Coin>
  ) {
    this.client = client;
    this.walletData = walletData;
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

  protected getNonce(): Promise<Nonce> {
    return this.client
      .get<Nonce>(`${this.baseUrl}/${this.walletData.id}/nonce`);
  }
}

export abstract class EthLikeWallet extends Wallet {
  protected constructor(
    client: Client,
    walletData: WalletData,
    keychains: Keychains,
  ) {
    super(client, walletData, keychains, GlobalCoinFactoryGenerator.get(walletData.blockchain));
  }

  verifyAddress(address: string): boolean {
    return false;
  }

  getChain(): string {
    return this.walletData.blockchain;
  }

  isValidAddress(address: string): boolean {
    return false;
  }

  async contractCall(
    contractAddress: string,
    value: number,
    data: string,
    passphrase: string
  ): Promise<Transaction> {
    const nonce: Nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce.nonce,
      value: value,
      toAddress: this.walletData.address,
      walletAddress: this.walletData.address
    };

    const signature = this.signPayload(
      multiSigPayload,
      passphrase
    );

    return this.sendTransaction({
      signature,
      blockchain: this.getChain(),
      multiSigPayload
    });
  }

  protected signPayload(multiSigPayload: MultiSigPayload, passphrase: string) {
    const payload =
      '0x' +
      multiSigPayload.walletAddress.slice(2) +
      multiSigPayload.toAddress.slice(2) +
      Bytes.pad(32, Bytes.fromNat(`0x${multiSigPayload.value.toString(16)}`)).slice(2) +
      Bytes.pad(32, Bytes.fromNat(`0x${multiSigPayload.walletNonce.toString(16)}`)).slice(2) +
      multiSigPayload.hexData.slice(2);

    return this.keychains.signPayload(
      payload,
      this.walletData.accountKey.keyFile,
      passphrase
    );
  }

  protected sendTransaction(halfSignedTransaction: HalfSignedTransaction) {
    return this.client
      .post<Transaction>(
        `${this.baseUrl}/transactions`,
        halfSignedTransaction
      );
  }

  async transfer(
    ticker: string,
    to: string,
    amount: number,
    passphrase: string
  ): Promise<Transaction> {
    const coin: Coin = this.coinFactory.get(ticker);
    const hexData = coin.buildData(to, amount);
    const nonce: Nonce = await this.getNonce();
    const value = Bytes.pad(32, Bytes.fromNat(`0x0`)); // nonce is zero
    const multiSigPayload: MultiSigPayload = {
      hexData: hexData,
      walletNonce: nonce.nonce,
      value: value,
      toAddress: this.walletData.address,
      walletAddress: this.walletData.address
    };

    const signature = this.signPayload(
      multiSigPayload,
      passphrase
    );

    return this.sendTransaction({
      signature,
      blockchain: this.getChain(),
      multiSigPayload
    });
  }
}

export class MasterWallet extends EthLikeWallet {
  private wallet: Contract;

  public constructor(
    client: Client,
    walletData: WalletData,
    keychains: Keychains,
  ) {
    super(client, walletData, keychains);
    this.wallet = new new Web3().eth.Contract((wallet as AbiItem[]));
  }

  async createUserWallet(passphrase: string): Promise<UserWallet> {
    const nonce: Nonce = await this.getNonce();
    const data = this.wallet.methods.createUserWallet().encodeABI();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce.nonce,
      value: 0,
      toAddress: this.walletData.address,
      walletAddress: this.walletData.address
    };

    const signature = this.signPayload(
      multiSigPayload,
      passphrase
    );

    const walletData = await this.client.post<WalletData>(`${this.baseUrl}/${this.walletData.id}/user-wallets`, {
      signature,
      blockchain: this.getChain(),
      multiSigPayload
    });

    return new UserWallet(
      this.client,
      walletData,
      this.keychains,
    )
  }
}

export class UserWallet extends EthLikeWallet {
  public constructor(
    client: Client,
    walletData: WalletData,
    keychains: Keychains
  ) {
    super(client, walletData, keychains);
  }
}