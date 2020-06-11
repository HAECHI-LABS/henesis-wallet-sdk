import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BN from "bn.js";
import aesjs from "aes-js";
import { Base64 } from "js-base64";
import { Coin, Eth, Klay, Erc20 } from "./coin";
import { BlockchainType } from "../blockchain";
import {
  Balance,
  Key,
  Keychains,
  KeyWithPriv,
  Pagination,
  PaginationOptions,
} from "../types";
import { MultiSigPayload, SignedMultiSigPayload } from "./transactions";
import { Client } from "../httpClient";
import { toChecksum } from "./keychains";
import BatchRequest from "./batch";
import wallet from "../contracts/MasterWallet.json";
import Bytes from "./eth-core-lib/bytes";
import { keccak256s } from "./eth-core-lib/hash";
import { BNConverter, ObjectConverter } from "../utils/common";
import { WalletData, Wallet } from "../wallet";
import { makeQueryString } from "../utils/url";

export interface EthTransaction {
  id: string;
  blockchain: BlockchainType;
  walletId: string;
  accountId: string;
  hash: string;
  status: string;
}

export interface EthMasterWalletData extends WalletData {
  backupKey: Key;
  accountKey: Key;
  encryptionKey: string;
}

export interface EthUserWalletData extends WalletData {}

export interface UserWalletPaginationOptions extends PaginationOptions {
  name?: string;
  id?: string;
  address?: string;
}

function convertSignedMultiSigPayloadToDTO(
  signedMultiSigPayload: SignedMultiSigPayload
) {
  return {
    signature: signedMultiSigPayload.signature,
    multiSigPayload: {
      hexData: signedMultiSigPayload.multiSigPayload.hexData,
      walletNonce: BNConverter.bnToHexString(
        signedMultiSigPayload.multiSigPayload.walletNonce
      ),
      value: BNConverter.bnToHexString(
        signedMultiSigPayload.multiSigPayload.value
      ),
      toAddress: signedMultiSigPayload.multiSigPayload.toAddress,
      walletAddress: signedMultiSigPayload.multiSigPayload.walletAddress,
    },
  };
}
export abstract class EthLikeWallet extends Wallet<EthTransaction, Keychains> {
  protected masterWalletData: EthMasterWalletData;

  protected constructor(
    client: Client,
    masterWalletData: EthMasterWalletData,
    keychains: Keychains
  ) {
    super(client, keychains);
    this.masterWalletData = masterWalletData;
  }

  getChain(): BlockchainType {
    return this.masterWalletData.blockchain;
  }

  async replaceTransaction(
    transactionId: string,
    otpCode?: string
  ): Promise<EthTransaction> {
    const walletId = this.getId();
    const blockchain = this.getChain();
    return this.client.post<EthTransaction>(`${this.baseUrl}/transactions`, {
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
    gasLimit?: BN
  ): Promise<EthTransaction> {
    return this.sendTransaction(
      this.getChain(),
      await this.buildContractCallPayload(
        contractAddress,
        value,
        data,
        passphrase
      ),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit
    );
  }

  public async buildContractCallPayload(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string
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
    gasLimit?: BN
  ): Promise<EthTransaction> {
    return this.sendTransaction(
      this.getChain(),
      await this.buildTransferPayload(ticker, to, amount, passphrase),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit
    );
  }

  public async buildTransferPayload(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    const coin: Coin = await this.getCoin(ticker);
    const hexData = coin.buildData(to, amount);
    const nonce = await this.getNonce();
    const multiSigPayload: MultiSigPayload = {
      hexData,
      walletNonce: nonce,
      value: BNConverter.hexStringToBN("0x0"),
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
      (signedMultiSigPayloads): Promise<EthTransaction[]> =>
        this.sendBatchTransaction(
          this.getChain(),
          signedMultiSigPayloads,
          this.getId(),
          otpCode
        )
    );
  }

  protected signPayload(multiSigPayload: MultiSigPayload, passphrase: string) {
    const payload = `0x${multiSigPayload.walletAddress
      .toLowerCase()
      .slice(2)}${multiSigPayload.toAddress.toLowerCase().slice(2)}${Bytes.pad(
      32,
      Bytes.fromNat(`0x${multiSigPayload.value.toString(16)}`)
    ).slice(2)}${Bytes.pad(
      32,
      Bytes.fromNat(`0x${multiSigPayload.walletNonce.toString(16)}`)
    ).slice(2)}${multiSigPayload.hexData.slice(2)}`;

    return this.keychains.signPayload(
      payload,
      this.masterWalletData.accountKey.keyFile,
      passphrase
    );
  }

  protected sendTransaction(
    blockchain: string,
    signedMultiSigPayload: SignedMultiSigPayload,
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ) {
    return this.client.post<EthTransaction>(`${this.baseUrl}/transactions`, {
      walletId,
      blockchain,
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
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
    gasLimit?: BN
  ): Promise<EthTransaction[]> {
    const signedMultiSigPayloadDTOs = signedMultiSigPayloads.map(
      (signedMultiSigPayload) =>
        convertSignedMultiSigPayloadToDTO(signedMultiSigPayload)
    );
    return this.client.post<EthTransaction[]>(
      `${this.baseUrl}/batch-transactions`,
      {
        walletId,
        blockchain,
        signedMultiSigPayloads: signedMultiSigPayloadDTOs,
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
        gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
        otpCode,
      }
    );
  }

  async getNonce(): Promise<BN> {
    const nonce: {
      nonce: string;
    } = await this.client.get(
      `${this.baseUrl}/${this.masterWalletData.id}/nonce`
    );
    return BNConverter.hexStringToBN(nonce.nonce);
  }

  protected async getCoin(ticker: string): Promise<Coin> {
    const coin: {
      symbol: string;
      address: string;
    } = await this.client.get(`/coins/${ticker.toUpperCase()}`);

    switch (coin.symbol.toUpperCase()) {
      case "ETH":
        return new Eth();
      case "KLAY":
        return new Klay();
      default:
        return new Erc20(coin.symbol, coin.address);
    }
  }
}

export class EthMasterWallet extends EthLikeWallet {
  private wallet: Contract;

  public constructor(
    client: Client,
    walletData: EthMasterWalletData,
    keychains: Keychains
  ) {
    super(client, walletData, keychains);
    this.wallet = new new Web3().eth.Contract(wallet as AbiItem[]);
  }

  async restorePassphrase(
    encryptedPassphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    const passphrase = this.recoverPassphrase(encryptedPassphrase);
    const initialKey: Key = await this.client.get<Key>(
      `${this.baseUrl}/${this.masterWalletData.id}/initial-key`
    );
    await this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      initialKey,
      otpCode
    );
  }

  private recoverPassphrase(encryptedPassphrase: string): string {
    const { encryptionKey } = this.masterWalletData;
    const aesCtr = new aesjs.ModeOfOperation.ctr(
      aesjs.utils.hex.toBytes(encryptionKey)
    );
    const decryptedBytes = aesCtr.decrypt(
      aesjs.utils.hex.toBytes(Base64.decode(encryptedPassphrase))
    );
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
  }

  async verifyEncryptedPassphrase(
    encryptedPassphrase: string
  ): Promise<boolean> {
    const passphrase = this.recoverPassphrase(encryptedPassphrase);
    const initialKey: Key = await this.client.get<Key>(
      `${this.baseUrl}/${this.masterWalletData.id}/initial-key`
    );
    return await this.verifyPassphraseWithKeyFile(passphrase, initialKey);
  }

  async verifyPassphrase(passphrase: string): Promise<boolean> {
    return this.verifyPassphraseWithKeyFile(passphrase);
  }

  private async verifyPassphraseWithKeyFile(
    passphrase: string,
    initialKey?: Key
  ): Promise<boolean> {
    try {
      this.keychains.decryptKeyFile(
        initialKey
          ? initialKey.keyFile
          : this.masterWalletData.accountKey.keyFile,
        passphrase
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async changePassphrase(
    passphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    return this.changePassphraseWithKeyFile(
      passphrase,
      newPassphrase,
      undefined,
      otpCode
    );
  }

  async changePassphraseWithKeyFile(
    passphrase: string,
    newPassphrase: string,
    initialKey?: Key,
    otpCode?: string
  ): Promise<void> {
    const newKey: KeyWithPriv = this.keychains.changePassword(
      initialKey
        ? initialKey.keyFile
        : this.masterWalletData.accountKey.keyFile,
      passphrase,
      newPassphrase
    );

    this.masterWalletData.accountKey = await this.client.patch<Key>(
      `${this.baseUrl}/${this.masterWalletData.id}/account-key`,
      {
        keyFile: newKey.keyFile,
        otpCode,
      }
    );
  }

  async createUserWallet(
    name: string,
    passphrase: string,
    gasPrice?: BN,
    salt?: BN
  ): Promise<EthUserWallet> {
    const nonce = await this.getNonce();
    // generates 32byte(256 bit) randoma hex string and converts to BN when salt is not defined
    if (salt === undefined) {
      salt = Web3.utils.toBN(Web3.utils.randomHex(32));
    }
    const data = this.wallet.methods.createUserWallet(salt).encodeABI();
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: nonce,
      value: BNConverter.hexStringToBN("0x0"),
      toAddress: this.getAddress(),
      walletAddress: this.getAddress(),
    };

    const signature = this.signPayload(multiSigPayload, passphrase);

    const signedMultiSigPayload = {
      signature,
      multiSigPayload,
    };

    const userWalletData = await this.client.post<EthUserWalletData>(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets`,
      {
        name,
        salt: BNConverter.bnToHexString(salt),
        blockchain: this.getChain(),
        signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
          signedMultiSigPayload
        ),
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      }
    );

    return new EthUserWallet(
      this.client,
      this.masterWalletData,
      this.keychains,
      userWalletData
    );
  }

  async getUserWallet(walletId: string): Promise<EthUserWallet> {
    const userWalletData = await this.client.get<EthUserWalletData>(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${walletId}`
    );
    return new EthUserWallet(
      this.client,
      this.masterWalletData,
      this.keychains,
      userWalletData
    );
  }

  async getBalance(): Promise<Balance[]> {
    const balances: {
      coinType: string;
      amount: string;
      name: string;
      symbol: string;
    }[] = await this.client.get(
      `${this.baseUrl}/${this.masterWalletData.id}/balance`
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

  getData(): EthMasterWalletData {
    return this.masterWalletData;
  }

  async getUserWallets(
    options?: UserWalletPaginationOptions
  ): Promise<Pagination<EthUserWallet>> {
    const queryString: string = makeQueryString(options);

    const data: Pagination<EthUserWalletData> = await this.client.get<
      Pagination<EthUserWalletData>
    >(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets?${queryString}`
    );

    return {
      pagination: data.pagination,
      results: data.results.map(
        (data) =>
          new EthUserWallet(
            this.client,
            this.masterWalletData,
            this.keychains,
            data
          )
      ),
    } as Pagination<EthUserWallet>;
  }

  getId(): string {
    return this.masterWalletData.id;
  }

  async changeName(name: string) {
    const masterWalletData: EthMasterWalletData = await this.client.patch<
      EthMasterWalletData
    >(`${this.baseUrl}/${this.masterWalletData.id}/name`, {
      name,
    });
    this.masterWalletData.name = masterWalletData.name;
  }
}

export class EthUserWallet extends EthLikeWallet {
  private readonly userWalletData: EthUserWalletData;

  public constructor(
    client: Client,
    walletData: EthMasterWalletData,
    keychains: Keychains,
    userWalletData: EthUserWalletData
  ) {
    super(client, walletData, keychains);
    this.userWalletData = userWalletData;
  }

  async getNonce(): Promise<BN> {
    const nonce: {
      nonce: string;
    } = await this.client.get(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/nonce`
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
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/balance`
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

  getData(): EthUserWalletData {
    return this.userWalletData;
  }

  getId(): string {
    return this.userWalletData.id;
  }

  async changeName(name: string) {
    const userWalletData: EthUserWalletData = await this.client.patch<
      EthUserWalletData
    >(
      `${this.baseUrl}/${this.masterWalletData.id}/user-wallets/${this.userWalletData.id}/name`,
      {
        name,
      }
    );
    this.userWalletData.name = userWalletData.name;
  }
}
