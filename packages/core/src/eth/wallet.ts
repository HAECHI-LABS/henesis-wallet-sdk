import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import BN from "bn.js";
import {
  ActivatingMasterWallet,
  convertWalletStatus,
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
import { MultiSigPayload, SignedMultiSigPayload } from "./transactions";
import { Client } from "../httpClient";
import walletAbi from "../contracts/Wallet.json";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import { makeQueryString } from "../utils/url";
import {
  TransactionDTO,
  UserWalletDTO,
  MasterWalletBalanceDTO,
  PaginationUserWalletDTO,
  MasterWalletDTO,
  ApproveWithdrawalApprovalRequest,
  RejectWithdrawalApprovalRequest,
  CreateUserWalletRequest,
  SignedMultiSigPayloadDTO,
  ChangeWalletNameRequest,
  ActivateMasterWalletRequest,
  KeyDTO,
  FlushRequest,
  PaginationFlushTransactionDTO,
  FlushQuerySearchCondition,
  FlushTransactionValueTransferEventDTO,
  FlushTransactionDTO,
  CreateNftMultiSigTransactionRequest,
} from "../__generate__/eth";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { Coin } from "./coin";
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
import { Nft } from "./nft";
import { canUseFlush, canUseFlushWithTargets } from "../utils/wallet";

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
    status: convertWalletStatus(data.status),
  };
};

export type FlushTransfer = Omit<
  FlushTransactionValueTransferEventDTO,
  "amount" | ""
> & {
  amount: BN;
};

export type FlushTransaction = Omit<
  FlushTransactionDTO,
  "blockchain" | "fee" | "transfers"
> & {
  blockchain: BlockchainType;
  fee: BN;
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
      blockchain: transformBlockchainType(blockchain),
      address,
      status,
      createdAt,
      updatedAt,
    };
  }

  async createDepositAddress(
    name: string,
    passphrase?: string,
    gasPrice?: BN,
    salt?: BN,
    otpCode?: string
  ): Promise<EthDepositAddress> {
    // generates 32byte(256 bit) randoma hex string and converts to BN when salt is not defined
    if (salt === undefined || salt == null) {
      salt = Web3.utils.toBN(Web3.utils.randomHex(32));
    }

    let signedMultiSigPayloadDTO: SignedMultiSigPayloadDTO = null;
    if (this.getVersionNumber() < 3 && passphrase === undefined) {
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
    const depositAddressParams: CreateUserWalletRequest = {
      name,
      salt: BNConverter.bnToHexString(salt),
      signedMultiSigPayload: signedMultiSigPayloadDTO,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      otpCode,
    };
    const depositAddressData = await this.client.post<UserWalletDTO>(
      `${this.baseUrl}/user-wallets`,
      depositAddressParams
    );

    return new EthDepositAddress(
      this.client,
      this.data,
      this.keychains,
      transformDepositAddressData(depositAddressData),
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
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const request: FlushRequest = {
      targets: flushTargets,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
      metadata,
    };
    const response = await this.client.post<TransactionDTO>(
      `${this.baseUrl}/flush`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async getFlushTransactions(
    option?: PaginationOptions & FlushQuerySearchCondition
  ): Promise<Pagination<FlushTransaction>> {
    const queryString = makeQueryString(option);
    const response = await this.client.get<PaginationFlushTransactionDTO>(
      `${this.baseUrl}/flush-transactions${
        queryString ? `?${queryString}` : ""
      }`
    );
    return {
      pagination: response.pagination,
      results: response.results.map((result) => {
        return {
          ...result,
          fee: BNConverter.hexStringToBN(String(result.fee ?? "0x0")),
          blockchain: transformBlockchainType(result.blockchain),
          transfers: result.transfers.map((transfer) => {
            return {
              ...transfer,
              amount: BNConverter.hexStringToBN(
                String(transfer.amount ?? "0x0")
              ),
            };
          }),
        };
      }),
    };
  }

  async getFlushTransaction(transactionId: string): Promise<FlushTransaction> {
    const response = await this.client.get<FlushTransactionDTO>(
      `${this.baseUrl}/flush-transactions/${transactionId}`
    );
    return {
      ...response,
      fee: BNConverter.hexStringToBN(String(response.fee ?? "0x0")),
      blockchain: transformBlockchainType(response.blockchain),
      transfers: response.transfers.map((transfer) => {
        return {
          ...transfer,
          amount: BNConverter.hexStringToBN(String(transfer.amount ?? "0x0")),
        };
      }),
    };
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

  async transferNft(
    nft: number | Nft,
    tokenOnchainId: string,
    to: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const n = typeof nft === "number" ? await this.nfts.getNft(nft) : nft;
    return this.sendNftTransaction(
      await this.buildTransferNftPayload(
        n,
        tokenOnchainId,
        this,
        to,
        passphrase
      ),
      n,
      tokenOnchainId,
      to,
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_NFT_TRANSFER_GAS_LIMIT,
      metadata
    );
  }

  async sendNftTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    nft: Nft,
    tokenOnchainId: string,
    to: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const request: CreateNftMultiSigTransactionRequest = {
      nftId: nft.getId(),
      tokenOnchainId,
      toAddress: to,
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
      ),
      gasPrice: BNConverter.bnToHexStringOrElseNull(gasPrice),
      gasLimit: BNConverter.bnToHexStringOrElseNull(gasLimit),
      otpCode,
      metadata,
    };
    const response = await this.client.post<TransactionDTO>(
      `/wallets/${this.getId()}/nft/transactions`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
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

  async flushWithTargets(
    flushTargets: Array<{ coinId: number; depositAddressId: string }>,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    if (
      !canUseFlushWithTargets(
        this.getData().blockchain,
        this.getVersionNumber()
      )
    ) {
      throw new Error(
        "This wallet is not a compatible version. Please use the v2 APIs."
      );
    }
    const request: FlushRequest = {
      targets: flushTargets,
      gasPrice: gasPrice ? BNConverter.bnToHexString(gasPrice) : undefined,
      gasLimit: gasLimit ? BNConverter.bnToHexString(gasLimit) : undefined,
      metadata,
    };
    const response = await this.client.post<TransactionDTO>(
      `${this.baseUrl}/flush`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }

  async flush(
    coin: string | Coin,
    userWalletIds: string[],
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    if (!canUseFlush(this.getData().blockchain, this.getVersionNumber())) {
      throw new Error(
        "This wallet is not a compatible version. Please use the v3 APIs."
      );
    }
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
      gasLimit || this.DEFAULT_CONTRACT_CALL_GAS_LIMIT,
      metadata
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

  async transferNft(
    nft: number | Nft,
    tokenOnchainId: string,
    to: string,
    passphrase: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const n = typeof nft === "number" ? await this.nfts.getNft(nft) : nft;
    return this.sendNftTransaction(
      await this.buildTransferNftPayload(
        n,
        tokenOnchainId,
        this,
        to,
        passphrase
      ),
      n,
      tokenOnchainId,
      to,
      otpCode,
      gasPrice,
      gasLimit || this.DEFAULT_NFT_TRANSFER_GAS_LIMIT,
      metadata
    );
  }

  async sendNftTransaction(
    signedMultiSigPayload: SignedMultiSigPayload,
    nft: Nft,
    tokenOnchainId: string,
    to: string,
    otpCode?: string,
    gasPrice?: BN,
    gasLimit?: BN,
    metadata?: string
  ): Promise<EthTransaction> {
    const request: CreateNftMultiSigTransactionRequest = {
      nftId: nft.getId(),
      tokenOnchainId,
      toAddress: to,
      signedMultiSigPayload: convertSignedMultiSigPayloadToDTO(
        signedMultiSigPayload
      ),
      gasPrice: BNConverter.bnToHexStringOrElseNull(gasPrice),
      gasLimit: BNConverter.bnToHexStringOrElseNull(gasLimit),
      otpCode,
      metadata,
    };
    const response = await this.client.post<TransactionDTO>(
      `/wallets/${this.getId()}/nft/transactions`,
      request
    );
    return {
      ...response,
      blockchain: transformBlockchainType(response.blockchain),
    };
  }
}
