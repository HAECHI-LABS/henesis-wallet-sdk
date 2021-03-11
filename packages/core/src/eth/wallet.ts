import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import BN from "bn.js";
import {
  ActivatingMasterWallet,
  transformWalletStatus,
  WalletStatus,
} from "../wallet";
import { BlockchainType, transformBlockchainType } from "../blockchain";
import {
  Balance,
  Key,
  Keychains,
  Pagination,
  PaginationOptions,
} from "../types";
import {
  formatMultiSigPayload,
  MultiSigPayload,
  SignedMultiSigPayload,
} from "./transactions";
import { Client } from "../httpClient";
import BatchRequest from "./batch";
import walletAbi from "../contracts/Wallet.json";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import { WalletData, Wallet } from "../wallet";
import { makeQueryString } from "../utils/url";
import { Coins } from "./coins";
import {
  TransactionDTO,
  BatchTransactionDTO,
  UserWalletDTO,
  BalanceDTO,
  MasterWalletBalanceDTO,
  PaginationUserWalletDTO,
  MasterWalletDTO,
  ApproveWithdrawalApprovalRequest,
  RejectWithdrawalApprovalRequest,
  CreateUserWalletRequest,
  SignedMultiSigPayloadDTO,
  CreateMultiSigTransactionRequest,
  ChangeWalletNameRequest,
  ReplaceTransactionRequest,
  ActivateMasterWalletRequest,
  KeyDTO,
  ResendTransactionRequest,
} from "../__generate__/eth";
import _ from "lodash";
import { ValidationParameterError } from "../error";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { Coin } from "./coin";
import { randomBytes } from "crypto";
import { keccak256 } from "./eth-core-lib/hash";
import { toChecksum } from "./keychains";
import { Address } from "cluster";

export type EthTransaction = Omit<TransactionDTO, "blockchain"> & {
  blockchain: BlockchainType;
};

export interface EthWalletData extends WalletData {
  blockchain: BlockchainType;
  version: string;
  transactionId?: string | null;
  error?: string | null;
}

export interface EthMasterWalletData extends EthWalletData {
  accountKey: Key;
  encryptionKey: string;
  whitelistActivated: boolean;
}

export interface EthUserWalletData
  extends Omit<EthWalletData, "encryptionKey"> {}

export interface EthDepositAddressData
  extends Omit<EthWalletData, "encryptionKey"> {}

export interface UserWalletPaginationOptions extends PaginationOptions {
  name?: string;
  id?: string;
  ids?: string[];
  address?: string;
  status?: WalletStatus;
}

export interface EthWithdrawalApproveParams extends ApproveWithdrawal {
  gasPrice?: BN;
  gasLimit?: BN;
}

export class EthActivatingMasterWallet extends ActivatingMasterWallet {}

function convertSignedMultiSigPayloadToDTO(
  signedMultiSigPayload: SignedMultiSigPayload
): SignedMultiSigPayloadDTO {
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

function getAddressFromPub(pub: String): string {
  const publicHash = keccak256(pub);
  return toChecksum(`0x${publicHash.slice(-40)}`);
}

export const transformMasterWalletData = (
  data: MasterWalletDTO
): EthMasterWalletData => {
  return {
    ...data,
    blockchain: transformBlockchainType(data.blockchain),
    status: transformWalletStatus(data.status),
  };
};

export const transformUserWalletData = (
  data: UserWalletDTO
): EthUserWalletData => {
  return {
    ...data,
    blockchain: transformBlockchainType(data.blockchain),
    status: transformWalletStatus(data.status),
  };
};

export const transformDepositAddressData = (
  data: UserWalletDTO
): EthDepositAddressData => {
  return {
    ...data,
    blockchain: transformBlockchainType(data.blockchain),
    status: transformWalletStatus(data.status),
  };
};

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
    blockchain: BlockchainType,
    baseUrl: string
  ) {
    super(client, keychains, baseUrl);
    this.data = data;
    this.blockchain = blockchain;
    this.coins = new Coins(this.client);
  }

  getChain(): BlockchainType {
    return this.blockchain;
  }

  getVersion(): string {
    return this.data.version;
  }

  getVersionNumber(): number {
    return parseInt(this.getVersion().substr(1));
  }

  async replaceTransaction(
    transactionId: string,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    checkNullAndUndefinedParameter({ transactionId });
    const request: ReplaceTransactionRequest = {
      walletId: this.getId(),
      transactionId,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
    };
    const response = await this.client.post<TransactionDTO>(
      `/wallets/transactions/replace`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async resendTransaction(
    transactionId: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    checkNullAndUndefinedParameter({ transactionId });
    const request: ResendTransactionRequest = {
      walletId: this.getId(),
      transactionId,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
    };
    const response = await this.client.post<NoUndefinedField<TransactionDTO>>(
      `/wallets/transactions/resend`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
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
    return this.sendTransaction(
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

  async buildContractCallPayload(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    if (_.isEmpty(data)) {
      throw new ValidationParameterError("data is empty");
    }
    checkNullAndUndefinedParameter({
      contractAddress,
      data,
      passphrase,
    });
    const multiSigPayload: MultiSigPayload = {
      hexData: data,
      walletNonce: this.getNonce(),
      value,
      toAddress: contractAddress,
      walletAddress: this.getAddress(),
    };
    return this.signPayload(multiSigPayload, passphrase);
  }

  async transfer(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
    return this.sendTransaction(
      await this.buildTransferPayload(c, to, amount, passphrase),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.getGasLimitByTicker(c)
    );
  }

  async buildTransferPayload(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    checkNullAndUndefinedParameter({
      coin,
      to,
      passphrase,
    });

    const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
    return this.signPayload(
      await c.buildTransferMultiSigPayload(this, to, amount),
      passphrase
    );
  }

  async createRawTransaction(
    coin: string | Coin,
    to: string,
    amount: BN
  ): Promise<MultiSigPayload> {
    checkNullAndUndefinedParameter({ coin, to });
    const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;
    return c.buildTransferMultiSigPayload(this, to, amount);
  }

  createBatchRequest(otpCode?: string): BatchRequest {
    return new BatchRequest(
      (
        signedMultiSigPayloads: SignedMultiSigPayload[]
      ): Promise<EthTransaction[]> =>
        this.sendBatchTransaction(
          this.getChain(),
          signedMultiSigPayloads,
          this.getId(),
          otpCode
        )
    );
  }

  protected signPayload(
    multiSigPayload: MultiSigPayload,
    passphrase: string
  ): SignedMultiSigPayload {
    return {
      signature: this.keychains.sign(
        this.data.accountKey,
        passphrase,
        formatMultiSigPayload(multiSigPayload)
      ),
      multiSigPayload,
    };
  }

  async sendTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    const request: CreateMultiSigTransactionRequest = {
      walletId,
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
      ),
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
      otpCode,
    };
    const response = await this.client.post<TransactionDTO>(
      `/wallets/transactions`,
      request
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
    >(`/wallets/batch-transactions`, {
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
        ...transaction,
        blockchain: transformBlockchainType(transaction.blockchain),
      };
    });
  }

  getNonce(): BN {
    return BNConverter.hexStringToBN("0x" + randomBytes(32).toString("hex"));
  }

  protected getGasLimitByTicker(coin: Coin): BN {
    const ticker = coin.getCoinData().symbol;
    if (ticker.toUpperCase() === "ETH" || ticker.toUpperCase() === "KLAY") {
      return this.DEFAULT_COIN_TRANSFER_GAS_LIMIT;
    }
    return this.DEFAULT_TOKEN_TRANSFER_GAS_LIMIT;
  }
}

interface FlushTransfer {
  coinSymbol: string;
  coinId: number;
  amount: BN;
  depositAddress: Address;
  isFirst: Boolean;
}

export interface FlushHistory {
  id: string;
  blockchain: BlockchainType;
  fee: BN;
  hash: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  transfers: FlushTransfer[];
}

export class EthMasterWallet extends EthLikeWallet {
  private walletContract: Contract;

  constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    blockchain: BlockchainType
  ) {
    super(client, data, keychains, blockchain, `/wallets/${data.id}`);
    this.walletContract = new new Web3().eth.Contract(walletAbi as AbiItem[]);
  }

  getEncryptionKey(): string {
    return this.data.encryptionKey;
  }

  getAccountKey(): Key {
    return this.data.accountKey;
  }

  updateAccountKey(key: Key): void {
    this.data.accountKey = key;
  }

  async activate(
    accountKey: Key,
    backupKey: Key
  ): Promise<EthActivatingMasterWallet> {
    const params: ActivateMasterWalletRequest = {
      accountKey: {
        pub: accountKey.pub,
        address: getAddressFromPub(accountKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      backupKey: {
        pub: backupKey.pub,
        address: getAddressFromPub(backupKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      gasPrice: undefined,
    };
    const masterWallet = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/activate`,
      params
    );
    return new EthActivatingMasterWallet(
      masterWallet.id,
      masterWallet.name,
      transformBlockchainType(masterWallet.blockchain),
      masterWallet.address,
      masterWallet.status,
      masterWallet.createdAt,
      masterWallet.updatedAt
    );
  }

  async createDepositAddress(
    name: string,
    passphrase: string,
    gasPrice?: BN,
    salt?: BN,
    otpCode?: string
  ): Promise<EthDepositAddress> {
    // generates 32byte(256 bit) randoma hex string and converts to BN when salt is not defined
    if (salt === undefined || salt == null) {
      salt = Web3.utils.toBN(Web3.utils.randomHex(32));
    }

    let signedMultiSigPayloadDTO: SignedMultiSigPayloadDTO = null;
    if (this.getVersionNumber() < 3) {
      const multiSigPayload: MultiSigPayload = {
        hexData: this.walletContract.methods.createUserWallet(salt).encodeABI(),
        walletNonce: this.getNonce(),
        value: BNConverter.hexStringToBN("0x0"),
        toAddress: this.getAddress(),
        walletAddress: this.getAddress(),
      };
      signedMultiSigPayloadDTO = convertSignedMultiSigPayloadToDTO(
        this.signPayload(multiSigPayload, passphrase)
      );
    }
    const userWalletParams: CreateUserWalletRequest = {
      name,
      salt: BNConverter.bnToHexString(salt),
      signedMultiSigPayload: signedMultiSigPayloadDTO,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      otpCode,
    };
    const userWalletData = await this.client.post<UserWalletDTO>(
      `${this.baseUrl}/user-wallets`,
      userWalletParams
    );

    return new EthDepositAddress(
      this.client,
      this.data,
      this.keychains,
      transformDepositAddressData(userWalletData),
      this.blockchain
    );
  }

  async getDepositAddress(walletId: string): Promise<EthDepositAddress> {
    const userWalletData = await this.client.get<UserWalletDTO>(
      `${this.baseUrl}/user-wallets/${walletId}`
    );
    return new EthDepositAddress(
      this.client,
      this.data,
      this.keychains,
      transformUserWalletData(userWalletData),
      this.blockchain
    );
  }

  async getBalance(flag?: boolean, symbol?: string): Promise<Balance[]> {
    const queryString = makeQueryString({ flag, symbol });
    const balances = await this.client.get<
      NoUndefinedField<MasterWalletBalanceDTO>[]
    >(`${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`);

    return balances.map((balance) => ({
      coinId: balance.coinId,
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(String(balance.amount ?? "0x0")),
      coinType: balance.coinType as any,
      spendableAmount: BNConverter.hexStringToBN(
        String(balance.spendableAmount ?? "0x0")
      ),
      name: balance.name,
      aggregatedAmount: BNConverter.hexStringToBN(
        String(balance.aggregatedAmount ?? "0x0")
      ),
      decimals: balance.decimals,
    }));
  }

  getAddress(): string {
    return this.data.address;
  }

  getData(): EthMasterWalletData {
    return this.data;
  }

  async getDepositAddresses(
    options?: UserWalletPaginationOptions
  ): Promise<Pagination<EthDepositAddress>> {
    const queryString = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationUserWalletDTO>
    >(`${this.baseUrl}/user-wallets${queryString ? `?${queryString}` : ""}`);

    return {
      pagination: data.pagination,
      results: data.results.map(
        (data) =>
          new EthDepositAddress(
            this.client,
            this.data,
            this.keychains,
            transformDepositAddressData(data),
            this.blockchain
          )
      ),
    };
  }

  async retryCreateDepositAddress(
    walletId: string,
    gasPrice?: BN
  ): Promise<EthDepositAddress> {
    checkNullAndUndefinedParameter({ walletId });
    const response = await this.client.post<UserWalletDTO>(
      `${this.baseUrl}/user-wallets/${walletId}/recreate`,
      { gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined }
    );

    return new EthDepositAddress(
      this.client,
      this.data,
      this.keychains,
      transformDepositAddressData(response),
      this.blockchain
    );
  }

  getId(): string {
    return this.data.id;
  }

  async changeName(name: string): Promise<void> {
    checkNullAndUndefinedParameter({ name });
    const request: ChangeWalletNameRequest = {
      name,
    };
    const masterWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.data.name = masterWalletData.name;
  }
  //todo: implement
  async flush(
    coin: string | Coin,
    depositAddressIds: string[],
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    return null;
  }

  //todo implement
  async getFlushHistory(
    option?: PaginationOptions
  ): Promise<Pagination<FlushHistory[]>> {
    return null;
  }

  async approve(params: EthWithdrawalApproveParams): Promise<EthTransaction> {
    const wallet = params.userWalletId
      ? await this.getDepositAddress(params.userWalletId)
      : this;

    const coin = await this.coins.getCoin(params.coinSymbol);
    const multiSigPayload = await coin.buildTransferMultiSigPayload(
      wallet,
      params.toAddress,
      params.amount
    );

    const request: ApproveWithdrawalApprovalRequest = {
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        this.signPayload(multiSigPayload, params.passphrase)
      ),
      otpCode: params.otpCode,
    };

    const response = await this.client.post<TransactionDTO>(
      `${this.withdrawalApprovalUrl}/${params.id}/approve`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async reject(params: { id: string; otpCode: string }): Promise<void> {
    const request: RejectWithdrawalApprovalRequest = {
      otpCode: params.otpCode,
    };
    await this.client.post<void>(
      `${this.withdrawalApprovalUrl}/${params.id}/reject`,
      request
    );
  }
}

export class EthMasterWalletV2 extends EthLikeWallet {
  private walletContract: Contract;

  constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    blockchain: BlockchainType
  ) {
    super(client, data, keychains, blockchain, `/wallets/${data.id}`);
    this.walletContract = new new Web3().eth.Contract(walletAbi as AbiItem[]);
  }

  getEncryptionKey(): string {
    return this.data.encryptionKey;
  }

  getAccountKey(): Key {
    return this.data.accountKey;
  }

  updateAccountKey(key: Key): void {
    this.data.accountKey = key;
  }

  async activate(
    accountKey: Key,
    backupKey: Key
  ): Promise<EthActivatingMasterWallet> {
    const params: ActivateMasterWalletRequest = {
      accountKey: {
        pub: accountKey.pub,
        address: getAddressFromPub(accountKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      backupKey: {
        pub: backupKey.pub,
        address: getAddressFromPub(backupKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      gasPrice: undefined,
    };
    const masterWallet = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/activate`,
      params
    );
    return new EthActivatingMasterWallet(
      masterWallet.id,
      masterWallet.name,
      transformBlockchainType(masterWallet.blockchain),
      masterWallet.address,
      masterWallet.status,
      masterWallet.createdAt,
      masterWallet.updatedAt
    );
  }

  async createUserWallet(
    name: string,
    passphrase: string,
    gasPrice?: BN,
    salt?: BN,
    otpCode?: string
  ): Promise<EthUserWallet> {
    // generates 32byte(256 bit) randoma hex string and converts to BN when salt is not defined
    if (salt === undefined || salt == null) {
      salt = Web3.utils.toBN(Web3.utils.randomHex(32));
    }

    let signedMultiSigPayloadDTO: SignedMultiSigPayloadDTO = null;
    if (this.getVersionNumber() < 3) {
      const multiSigPayload: MultiSigPayload = {
        hexData: this.walletContract.methods.createUserWallet(salt).encodeABI(),
        walletNonce: this.getNonce(),
        value: BNConverter.hexStringToBN("0x0"),
        toAddress: this.getAddress(),
        walletAddress: this.getAddress(),
      };
      signedMultiSigPayloadDTO = convertSignedMultiSigPayloadToDTO(
        this.signPayload(multiSigPayload, passphrase)
      );
    }
    const userWalletParams: CreateUserWalletRequest = {
      name,
      salt: BNConverter.bnToHexString(salt),
      signedMultiSigPayload: signedMultiSigPayloadDTO,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      otpCode,
    };
    const userWalletData = await this.client.post<UserWalletDTO>(
      `${this.baseUrl}/user-wallets`,
      userWalletParams
    );

    return new EthUserWallet(
      this.client,
      this.data,
      this.keychains,
      transformUserWalletData(userWalletData),
      this.blockchain
    );
  }

  async getUserWallet(walletId: string): Promise<EthUserWallet> {
    const userWalletData = await this.client.get<UserWalletDTO>(
      `${this.baseUrl}/user-wallets/${walletId}`
    );
    return new EthUserWallet(
      this.client,
      this.data,
      this.keychains,
      transformUserWalletData(userWalletData),
      this.blockchain
    );
  }

  async getBalance(flag?: boolean, symbol?: string): Promise<Balance[]> {
    const queryString = makeQueryString({ flag, symbol });
    const balances = await this.client.get<
      NoUndefinedField<MasterWalletBalanceDTO>[]
    >(`${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`);

    return balances.map((balance) => ({
      coinId: balance.coinId,
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(String(balance.amount ?? "0x0")),
      coinType: balance.coinType as any,
      spendableAmount: BNConverter.hexStringToBN(
        String(balance.spendableAmount ?? "0x0")
      ),
      name: balance.name,
      aggregatedAmount: BNConverter.hexStringToBN(
        String(balance.aggregatedAmount ?? "0x0")
      ),
      decimals: balance.decimals,
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
    const queryString = makeQueryString(options);
    const data = await this.client.get<
      NoUndefinedField<PaginationUserWalletDTO>
    >(`${this.baseUrl}/user-wallets${queryString ? `?${queryString}` : ""}`);

    return {
      pagination: data.pagination,
      results: data.results.map(
        (data) =>
          new EthUserWallet(
            this.client,
            this.data,
            this.keychains,
            transformUserWalletData(data),
            this.blockchain
          )
      ),
    };
  }

  async retryCreateUserWallet(
    walletId: string,
    gasPrice?: BN
  ): Promise<EthUserWallet> {
    checkNullAndUndefinedParameter({ walletId });
    const response = await this.client.post<UserWalletDTO>(
      `${this.baseUrl}/user-wallets/${walletId}/recreate`,
      { gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined }
    );

    return new EthUserWallet(
      this.client,
      this.data,
      this.keychains,
      transformUserWalletData(response),
      this.blockchain
    );
  }

  getId(): string {
    return this.data.id;
  }

  async changeName(name: string): Promise<void> {
    checkNullAndUndefinedParameter({ name });
    const request: ChangeWalletNameRequest = {
      name,
    };
    const masterWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.data.name = masterWalletData.name;
  }

  async flush(
    coin: string | Coin,
    userWalletIds: string[],
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    if (userWalletIds.length > 50 || userWalletIds.length == 0) {
      throw new Error(`only 1 ~ 50 accounts can be flushed at a time`);
    }
    const c = typeof coin === "string" ? await this.coins.getCoin(coin) : coin;

    const userWallets: Pagination<EthUserWallet> = await this.getUserWallets({
      ids: userWalletIds,
      size: userWalletIds.length,
    });
    const userWalletAddresses = userWallets.results.map((userWallet) =>
      userWallet.getAddress()
    );

    if (userWalletIds.length != userWalletAddresses.length) {
      throw new Error(
        `your input user wallet id count is ${userWalletIds.length}. but matched user wallet count is ${userWalletAddresses.length}`
      );
    }

    const multiSigPayload: MultiSigPayload = {
      hexData: c.buildFlushData(this, userWalletAddresses),
      walletNonce: this.getNonce(),
      value: BNConverter.hexStringToBN("0x0"),
      toAddress: this.getAddress(),
      walletAddress: this.getAddress(),
    };

    return this.sendTransaction(
      this.signPayload(multiSigPayload, passphrase),
      this.getId(),
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT
    );
  }

  async approve(params: EthWithdrawalApproveParams): Promise<EthTransaction> {
    const wallet = params.userWalletId
      ? await this.getUserWallet(params.userWalletId)
      : this;

    const coin = await this.coins.getCoin(params.coinSymbol);
    const multiSigPayload = await coin.buildTransferMultiSigPayload(
      wallet,
      params.toAddress,
      params.amount
    );

    const request: ApproveWithdrawalApprovalRequest = {
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        this.signPayload(multiSigPayload, params.passphrase)
      ),
      otpCode: params.otpCode,
    };

    const response = await this.client.post<TransactionDTO>(
      `${this.withdrawalApprovalUrl}/${params.id}/approve`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async reject(params: { id: string; otpCode: string }): Promise<void> {
    const request: RejectWithdrawalApprovalRequest = {
      otpCode: params.otpCode,
    };
    await this.client.post<void>(
      `${this.withdrawalApprovalUrl}/${params.id}/reject`,
      request
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
    super(
      client,
      data,
      keychains,
      blockchain,
      `/wallets/${data.id}/user-wallets/${userWalletData.id}`
    );
    this.userWalletData = userWalletData;
  }

  async getBalance(flag?: boolean, symbol?: string): Promise<Balance[]> {
    const queryString: string = makeQueryString({ flag, symbol });
    const balances = await this.client.get<BalanceDTO[]>(
      `${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`
    );

    return balances.map((balance) => ({
      coinId: balance.coinId,
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(String(balance.amount ?? "0x0")),
      coinType: balance.coinType as any,
      spendableAmount: BNConverter.hexStringToBN(
        String(balance.spendableAmount ?? "0x0")
      ),
      name: balance.name,
      decimals: balance.decimals,
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

  async changeName(name: string): Promise<void> {
    const request: ChangeWalletNameRequest = {
      name,
    };
    const userWalletData = await this.client.patch<UserWalletDTO>(
      `${this.baseUrl}/name`,
      request
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

export class EthDepositAddress extends EthLikeWallet {
  private readonly depositWalletData: EthDepositAddressData;

  public constructor(
    client: Client,
    data: EthMasterWalletData,
    keychains: Keychains,
    depositWalletData: EthDepositAddressData,
    blockchain: BlockchainType
  ) {
    super(
      client,
      data,
      keychains,
      blockchain,
      `/wallets/${data.id}/user-wallets/${depositWalletData.id}`
    );
    this.depositWalletData = depositWalletData;
  }

  async getBalance(flag?: boolean, symbol?: string): Promise<Balance[]> {
    const queryString: string = makeQueryString({ flag, symbol });
    const balances = await this.client.get<BalanceDTO[]>(
      `${this.baseUrl}/balance${queryString ? `?${queryString}` : ""}`
    );

    return balances.map((balance) => ({
      coinId: balance.coinId,
      symbol: balance.symbol,
      amount: BNConverter.hexStringToBN(String(balance.amount ?? "0x0")),
      coinType: balance.coinType as any,
      spendableAmount: BNConverter.hexStringToBN(
        String(balance.spendableAmount ?? "0x0")
      ),
      name: balance.name,
      decimals: balance.decimals,
    }));
  }

  getAddress(): string {
    return this.depositWalletData.address;
  }

  getData(): EthDepositAddressData {
    return this.depositWalletData;
  }

  getId(): string {
    return this.depositWalletData.id;
  }

  async changeName(name: string): Promise<void> {
    const request: ChangeWalletNameRequest = {
      name,
    };
    const depositWalletData = await this.client.patch<UserWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.depositWalletData.name = depositWalletData.name;
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
  async replaceTransaction(
    transactionId: string,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    throw new Error("unimplemented method");
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
    throw new Error("unimplemented method");
  }
  async buildContractCallPayload(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    throw new Error("unimplemented method");
  }
  async transfer(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    throw new Error("unimplemented method");
  }
  async buildTransferPayload(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string
  ): Promise<SignedMultiSigPayload> {
    throw new Error("unimplemented method");
  }
  async createRawTransaction(
    coin: string | Coin,
    to: string,
    amount: BN
  ): Promise<MultiSigPayload> {
    throw new Error("unimplemented method");
  }
  protected signPayload(
    multiSigPayload: MultiSigPayload,
    passphrase: string
  ): SignedMultiSigPayload {
    throw new Error("unimplemented method");
  }

  async sendTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction> {
    throw new Error("unimplemented method");
  }

  protected async sendBatchTransaction(
    blockchain: BlockchainType,
    signedMultiSigPayloads: SignedMultiSigPayload[],
    walletId: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN
  ): Promise<EthTransaction[]> {
    throw new Error("unimplemented method");
  }
}
