import { Contract } from "web3-eth-contract/";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BN from "bn.js";
import { Coin } from "./coin";
import { BlockchainType, transformBlockchainType } from "../blockchain";
import {
  Balance,
  Key,
  Keychains,
  Pagination,
  PaginationOptions,
} from "../types";
import { MultiSigPayload, SignedMultiSigPayload } from "./transactions";
import { Client } from "../httpClient";
import BatchRequest from "./batch";
import wallet from "../contracts/MasterWallet.json";
import Bytes from "./eth-core-lib/bytes";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import { WalletData, Wallet } from "../wallet";
import { makeQueryString } from "../utils/url";
import { Coins } from "./coins";
import {
  TransactionDTO,
  BatchTransactionDTO,
  NonceDTO,
  UserWalletDTO,
  BalanceDTO,
  PaginationUserWalletDTO,
  MasterWalletDTO,
} from "../__generate__/eth";
import _ from "lodash";

export type EthTransaction = Omit<TransactionDTO, "blockchain"> & {
  blockchain: BlockchainType;
};

export interface EthWalletData extends WalletData {
  blockchain: BlockchainType;
  transactionId: string | null;
  error: string | null;
}

export interface EthMasterWalletData extends EthWalletData {
  accountKey: Key;
  encryptionKey: string;
}

export interface EthUserWalletData
  extends Omit<EthWalletData, "encryptionKey"> {}

export interface UserWalletPaginationOptions extends PaginationOptions {
  name?: string;
  id?: string;
  ids?: string[];
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

export abstract class EthLikeWallet extends Wallet<EthTransaction> {
  protected data: EthMasterWalletData;
  protected readonly DEFAULT_CONTRACT_CALL_GAS_LIMIT: BN = new BN(1000000);
  protected readonly DEFAULT_COIN_TRANSFER_GAS_LIMIT: BN = new BN(150000);
  protected readonly DEFAULT_TOKEN_TRANSFER_GAS_LIMIT: BN = new BN(500000);

  protected readonly blockchain: BlockchainType;

  protected readonly coins: Coins;

  protected constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    blockchain: BlockchainType
  ) {
    super(client, keychains);
    this.data = data;
    this.blockchain = blockchain;
    this.coins = new Coins(this.client);
  }

  getChain(): BlockchainType {
    return this.blockchain;
  }

  async replaceTransaction(
    transactionId: string,
    otpCode?: string
  ): Promise<EthTransaction> {
    checkNullAndUndefinedParameter({ transactionId });
    const walletId = this.getId();
    const blockchain = this.getChain();
    const response = await this.client.post<NoUndefinedField<TransactionDTO>>(
      `${this.baseUrl}/transactions`,
      {
        walletId,
        transactionId,
        blockchain,
        otpCode,
      }
    );
    return {
      id: response.id,
      blockchain: transformBlockchainType(response.blockchain),
      hash: response.hash,
      status: response.status,
    };
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
    checkNullAndUndefinedParameter({
      contractAddress,
      data,
      passphrase,
    });
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
      gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT
    );
  }

  public async buildContractCallPayload(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    checkNullAndUndefinedParameter({
      contractAddress,
      data,
      passphrase,
    });
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
    checkNullAndUndefinedParameter({
      ticker,
      to,
      passphrase,
    });
    return this.sendTransaction(
      this.getChain(),
      await this.buildTransferPayload(ticker, to, amount, passphrase),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.getGasLimitByTicker(ticker)
    );
  }

  public async buildTransferPayload(
    ticker: string,
    to: string,
    amount: BN,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    const coin: Coin = await this.coins.getCoin(ticker);
    const hexData = coin.buildTransferData(to, amount);
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

    return this.keychains.sign(this.data.accountKey, passphrase, payload);
  }

  protected async sendTransaction(
    blockchain: BlockchainType,
    signedMultiSigPayload: SignedMultiSigPayload,
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    const response = await this.client.post<TransactionDTO>(
      `${this.baseUrl}/transactions`,
      {
        walletId,
        blockchain,
        signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
          signedMultiSigPayload
        ),
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
        gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
        otpCode,
      }
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  protected async sendBatchTransaction(
    blockchain: BlockchainType,
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
    const response = await this.client.post<
      NoUndefinedField<BatchTransactionDTO>[]
    >(`${this.baseUrl}/batch-transactions`, {
      walletId,
      blockchain,
      signedMultiSigPayloads: signedMultiSigPayloadDTOs,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
      otpCode,
    });
    return _.map(response, (batchTransaction) => {
      const transaction = batchTransaction.transaction;
      return {
        id: transaction.id,
        blockchain: transformBlockchainType(transaction.blockchain),
        hash: transaction.hash,
        status: transaction.status,
      };
    });
  }

  async getNonce(): Promise<BN> {
    const nonce = await this.client.get<NonceDTO>(
      `${this.baseUrl}/${this.getId()}/nonce`
    );
    return BNConverter.hexStringToBN(String(nonce.nonce));
  }

  protected getGasLimitByTicker(ticker: string): BN {
    if (ticker.toUpperCase() === "ETH" || ticker.toUpperCase() === "KLAY") {
      return this.DEFAULT_COIN_TRANSFER_GAS_LIMIT;
    }
    return this.DEFAULT_TOKEN_TRANSFER_GAS_LIMIT;
  }
}

export class EthMasterWallet extends EthLikeWallet {
  private wallet: Contract;

  public constructor(
    client: Client,
    walletData: EthMasterWalletData,
    keychains: Keychains,
    blockchain: BlockchainType
  ) {
    super(client, walletData, keychains, blockchain);
    this.wallet = new new Web3().eth.Contract(wallet as AbiItem[]);
  }

  getEncryptionKey(): string {
    return this.data.encryptionKey;
  }

  getAccountKey(): Key {
    return this.data.accountKey;
  }

  updateAccountKey(key: Key) {
    this.data.accountKey = key;
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

    const userWalletData = await this.client.post<
      NoUndefinedField<UserWalletDTO>
    >(`${this.baseUrl}/${this.getId()}/user-wallets`, {
      name,
      salt: BNConverter.bnToHexString(salt),
      blockchain: this.getChain(),
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
      ),
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
    });

    return new EthUserWallet(
      this.client,
      this.data,
      this.keychains,
      {
        ...userWalletData,
        blockchain: transformBlockchainType(userWalletData.blockchain),
      },
      this.blockchain
    );
  }

  async getUserWallet(walletId: string): Promise<EthUserWallet> {
    const userWalletData = await this.client.get<
      NoUndefinedField<UserWalletDTO>
    >(`${this.baseUrl}/${this.getId()}/user-wallets/${walletId}`);
    return new EthUserWallet(
      this.client,
      this.data,
      this.keychains,
      {
        ...userWalletData,
        blockchain: transformBlockchainType(userWalletData.blockchain),
      },
      this.blockchain
    );
  }

  async getBalance(flag?: boolean): Promise<Balance[]> {
    const queryString: string = makeQueryString({ flag });
    const balances = await this.client.get<NoUndefinedField<BalanceDTO>[]>(
      `${this.baseUrl}/${this.data.id}/balance${
        queryString ? `?${queryString}` : ""
      }`
    );

    return balances.map((balance) => ({
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(String(balance.amount)),
      coinType: balance.coinType as any,
      name: balance.name,
    }));
  }

  getAddress(): string {
    return this.data.address;
  }

  getData(): EthMasterWalletData {
    return this.data;
  }

  async getUserWallets(
    options?: UserWalletPaginationOptions
  ): Promise<Pagination<EthUserWallet>> {
    const queryString: string = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationUserWalletDTO>
    >(
      `${this.baseUrl}/${this.data.id}/user-wallets${
        queryString ? `?${queryString}` : ""
      }`
    );

    return {
      pagination: data.pagination,
      results: data.results.map(
        (data) =>
          new EthUserWallet(
            this.client,
            this.data,
            this.keychains,
            {
              ...data,
              blockchain: transformBlockchainType(data.blockchain),
            },
            this.blockchain
          )
      ),
    };
  }

  getId(): string {
    return this.data.id;
  }

  async changeName(name: string) {
    checkNullAndUndefinedParameter({ name });
    const masterWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.baseUrl}/${this.data.id}/name`,
      {
        name,
      }
    );
    this.data.name = masterWalletData.name;
  }

  async flush(
    ticker: string,
    userWalletIds: string[],
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ) {
    if (userWalletIds.length > 50) {
      throw new Error(`only 50 accounts can be flushed at a time`);
    }
    const coin: Coin = await this.coins.getCoin(ticker);
    const userWallets: Pagination<EthUserWallet> = await this.getUserWallets({
      ids: userWalletIds,
      size: userWalletIds.length,
    });
    const nonce = await this.getNonce();
    const userWalletAddresses = userWallets.results.map((userWallet) =>
      userWallet.getAddress()
    );

    if (userWalletIds.length != userWalletAddresses.length) {
      throw new Error(
        `your input user wallet id count is ${userWalletIds.length}. but matched user wallet count is ${userWalletAddresses.length}`
      );
    }

    const multiSigPayload: MultiSigPayload = {
      hexData: coin.buildFlushData(
        userWalletAddresses,
        coin.getCoinData().address
      ),
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

    return this.sendTransaction(
      this.getChain(),
      signedMultiSigPayload,
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT
    );
  }
}

export class EthUserWallet extends EthLikeWallet {
  private readonly userWalletData: EthUserWalletData;

  public constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    userWalletData: EthUserWalletData,
    blockchain: BlockchainType
  ) {
    super(client, data, keychains, blockchain);
    this.userWalletData = userWalletData;
  }

  async getNonce(): Promise<BN> {
    const nonce = await this.client.get<NonceDTO>(
      `${this.baseUrl}/${this.data.id}/user-wallets/${this.userWalletData.id}/nonce`
    );
    return BNConverter.hexStringToBN(String(nonce.nonce));
  }

  async getBalance(flag?: boolean): Promise<Balance[]> {
    const params = flag ? `?flag=${flag}` : "";
    const balances = await this.client.get<BalanceDTO[]>(
      `${this.baseUrl}/${this.data.id}/user-wallets/${this.userWalletData.id}/balance${params}`
    );

    return balances.map((balance) => ({
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(String(balance.amount)),
      coinType: balance.coinType as any,
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
    const userWalletData = await this.client.patch<UserWalletDTO>(
      `${this.baseUrl}/${this.data.id}/user-wallets/${this.userWalletData.id}/name`,
      {
        name,
      }
    );
    this.userWalletData.name = userWalletData.name;
  }

  changePassphrase(
    passphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    throw new Error("unimplemented method");
  }

  restorePassphrase(
    encryptedPassphrase: string,
    newPassphrase: string,
    otpCode?: string
  ): Promise<void> {
    throw new Error("unimplemented method");
  }

  verifyEncryptedPassphrase(encryptedPassphrase: string): Promise<boolean> {
    throw new Error("unimplemented method");
  }

  verifyPassphrase(passphrase: string): Promise<boolean> {
    throw new Error("unimplemented method");
  }

  getEncryptionKey(): string {
    return "";
  }

  getAccountKey(): Key {
    throw new Error("unimplemented method");
  }

  updateAccountKey(key: Key) {
    throw new Error("unimplemented method");
  }
}
