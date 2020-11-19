import { Contract } from "web3-eth-contract/";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BN from "bn.js";
import { transformWalletStatus, WalletStatus } from "../wallet";
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
  MasterWalletBalanceDTO,
  PaginationUserWalletDTO,
  MasterWalletDTO,
  ApproveWithdrawalApprovalRequest,
  RejectWithdrawalApprovalRequest,
  CreateUserWalletRequest,
} from "../__generate__/eth";
import _ from "lodash";
import { ValidationParameterError } from "../error";
import { ApproveWithdrawal } from "../withdrawalApprovals";

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

  async replaceTransaction(
    transactionId: string,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    checkNullAndUndefinedParameter({ transactionId });
    const walletId = this.getId();
    const blockchain = this.getChain();
    const data = await this.client.post<TransactionDTO>(
      `/wallets/transactions`,
      {
        walletId,
        transactionId,
        gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
        blockchain,
      }
    );
    return {
      ...data,
      blockchain: transformBlockchainType(data.blockchain),
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
    if (_.isEmpty(data)) {
      throw new ValidationParameterError("data is empty");
    }
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

    return this.signPayload(multiSigPayload, passphrase);
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
    const signedMultiSigPayload = await this.buildTransferPayload(
      ticker,
      to,
      amount,
      passphrase
    );

    return this.sendTransaction(
      this.getChain(),
      signedMultiSigPayload,
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
    checkNullAndUndefinedParameter({
      ticker,
      to,
      passphrase,
    });

    const coin = await this.coins.getCoin(ticker);

    return this.signPayload(
      await coin.buildTransferMultiSigPayload(this, to, amount),
      passphrase
    );
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

  protected signPayload(
    multiSigPayload: MultiSigPayload,
    passphrase: string
  ): SignedMultiSigPayload {
    const payload = `0x${multiSigPayload.walletAddress
      .toLowerCase()
      .slice(2)}${multiSigPayload.toAddress.toLowerCase().slice(2)}${Bytes.pad(
      32,
      Bytes.fromNat(`0x${multiSigPayload.value.toString(16)}`)
    ).slice(2)}${Bytes.pad(
      32,
      Bytes.fromNat(`0x${multiSigPayload.walletNonce.toString(16)}`)
    ).slice(2)}${multiSigPayload.hexData.slice(2)}`;

    return {
      signature: this.keychains.sign(this.data.accountKey, passphrase, payload),
      multiSigPayload,
    };
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
      `/wallets/transactions`,
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

  async getNonce(): Promise<BN> {
    const nonce = await this.client.get<NonceDTO>(`${this.baseUrl}/nonce`);
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
    data: EthMasterWalletData,
    keychains: Keychains,
    blockchain: BlockchainType
  ) {
    super(client, data, keychains, blockchain, `/wallets/${data.id}`);
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
    salt?: BN,
    otpCode?: string
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

    const signedMultiSigPayload = this.signPayload(multiSigPayload, passphrase);

    const userWalletParams: CreateUserWalletRequest = {
      name,
      salt: BNConverter.bnToHexString(salt),
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
      ),
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
    const queryString: string = makeQueryString({ flag, symbol });
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
    const queryString: string = makeQueryString(options);
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

  public async retryCreateUserWallet(walletId: string, gasPrice?: BN) {
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

  async changeName(name: string) {
    checkNullAndUndefinedParameter({ name });
    const masterWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.baseUrl}/name`,
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
    if (userWalletIds.length > 50 || userWalletIds.length == 0) {
      throw new Error(`only 1 ~ 50 accounts can be flushed at a time`);
    }
    const coin = await this.coins.getCoin(ticker);
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

    const signedMultiSigPayload = this.signPayload(multiSigPayload, passphrase);

    return this.sendTransaction(
      this.getChain(),
      signedMultiSigPayload,
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
    const signedMultiSigPayload = this.signPayload(
      await coin.buildTransferMultiSigPayload(
        wallet,
        params.toAddress,
        params.amount
      ),
      params.passphrase
    );

    const request: ApproveWithdrawalApprovalRequest = {
      signedMultiSigPayload: {
        ...signedMultiSigPayload,
        multiSigPayload: {
          ...signedMultiSigPayload.multiSigPayload,
          value: BNConverter.bnToHexString(
            signedMultiSigPayload.multiSigPayload.value
          ),
          walletNonce: BNConverter.bnToHexString(
            signedMultiSigPayload.multiSigPayload.walletNonce
          ),
        },
      },
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

  async getNonce(): Promise<BN> {
    const nonce = await this.client.get<NonceDTO>(`${this.baseUrl}/nonce`);
    return BNConverter.hexStringToBN(String(nonce.nonce));
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

  async changeName(name: string) {
    const userWalletData = await this.client.patch<UserWalletDTO>(
      `${this.baseUrl}/name`,
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
