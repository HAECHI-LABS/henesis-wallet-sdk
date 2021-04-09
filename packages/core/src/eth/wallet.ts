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
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { Coin } from "./coin";
import { randomBytes } from "crypto";
import {
  EthDepositAddress,
  transformDepositAddressData,
} from "./depositAddress";
import { transformUserWalletData, EthUserWallet } from "./userWallet";
import {
  EthLikeWallet,
  EthMasterWalletData,
  EthTransaction,
  convertSignedMultiSigPayloadToDTO,
  getAddressFromCompressedPub,
} from "./abstractWallet";

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

export type EthActivatingMasterWallet = ActivatingMasterWallet;

export const transformMasterWalletData = (
  data: MasterWalletDTO
): EthMasterWalletData => {
  return {
    ...data,
    blockchain: transformBlockchainType(data.blockchain),
    status: transformWalletStatus(data.status),
  };
};

type FlushTransfer = {
  coinSymbol: string;
  coinId: number;
  amount: BN;
  depositAddress: string;
  isFirst: Boolean;
};

export type FlushHistory = {
  id: string;
  blockchain: BlockchainType;
  fee: BN;
  hash: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  transfers: FlushTransfer[];
};

export class EthWallet extends EthLikeWallet {
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

  resendTransaction(transactionId: string, gasPrice?: BN) {
    return super.resendTransaction(transactionId, gasPrice);
  }

  contractCall(
    contractAddress: string,
    value: BN,
    data: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    return super.contractCall(
      contractAddress,
      value,
      data,
      passphrase,
      otpCode,
      gasPrice
    );
  }

  transfer(
    coin: string | Coin,
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    return super.transfer(coin, to, amount, passphrase, otpCode, gasPrice);
  }

  sendTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    walletId: string,
    otpCode?: string,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    return super.sendTransaction(
      signedMultiSigPayload,
      walletId,
      otpCode,
      gasPrice
    );
  }

  sendBatchTransaction(
    blockchain: BlockchainType,
    signedMultiSigPayloads: SignedMultiSigPayload[],
    walletId: string,
    otpCode?: string,
    gasPrice?: BN
  ): Promise<EthTransaction[]> {
    return super.sendBatchTransaction(
      blockchain,
      signedMultiSigPayloads,
      walletId,
      otpCode,
      gasPrice
    );
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
        address: getAddressFromCompressedPub(accountKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      backupKey: {
        pub: backupKey.pub,
        address: getAddressFromCompressedPub(backupKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      gasPrice: undefined,
    };
    const masterWallet = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/activate`,
      params
    );
    const {
      id,
      name: walletName,
      blockchain,
      address,
      status,
      createdAt,
      updatedAt,
    } = masterWallet;

    return {
      id,
      name: walletName,
      blockchain: transformBlockchainType(masterWallet.blockchain),
      address,
      status,
      createdAt,
      updatedAt,
    };
  }

  async createDepositAddress(
    name: string,
    otpCode?: string
  ): Promise<EthDepositAddress> {
    const userWalletParams = {
      name,
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
      transformDepositAddressData(userWalletData),
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

  async flush(
    flushTargets: Array<{ coinId: number; depositAddressId: string }>,
    gasPrice?: BN
  ): Promise<EthTransaction> {
    const response = await this.client.post<Pagination<FlushHistory[]>>(
      `${this.baseUrl}/flush`,
      {
        targets: flushTargets,
        gasPrice,
      }
    );
    return null;
  }

  async getFlushHistories(
    option?: PaginationOptions
  ): Promise<Pagination<FlushHistory>> {
    const queryString = makeQueryString(option);
    const response = await this.client.get<Pagination<FlushHistory[]>>(
      `${this.baseUrl}/flush-transactions${
        queryString ? `?${queryString}` : ""
      }`
    );
    const MOCK_DATA = {
      pagination: {
        nextUrl: null,
        previousUrl: null,
        totalCount: 1,
      },
      results: [
        {
          id: "948e61c20268f9477ca85d6ecef90859",
          blockchain: BlockchainType.ETHEREUM,
          fee: new BN("0"),
          hash: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
          status: "REQUESTED",
          createdAt: String(new Date().valueOf()),
          updatedAt: String(new Date().valueOf()),
          transfers: [
            {
              coinSymbol: "ETH",
              coinId: 2,
              amount: new BN("0"),
              depositAddress: "0x4ef3ba60c8710f45371835cddafabf33daa83e1d",
              isFirst: true,
            },
          ],
        },
      ],
    };
    return MOCK_DATA;
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
        address: getAddressFromCompressedPub(accountKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      backupKey: {
        pub: backupKey.pub,
        address: getAddressFromCompressedPub(backupKey.pub),
        keyFile: undefined,
      } as KeyDTO,
      gasPrice: undefined,
    };
    const masterWallet = await this.client.post<MasterWalletDTO>(
      `${this.baseUrl}/activate`,
      params
    );
    const {
      id,
      name: walletName,
      blockchain,
      address,
      status,
      createdAt,
      updatedAt,
    } = masterWallet;

    return {
      id,
      name: walletName,
      blockchain: transformBlockchainType(masterWallet.blockchain),
      address,
      status,
      createdAt,
      updatedAt,
    };
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
