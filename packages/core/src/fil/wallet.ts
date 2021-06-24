import {
  FilAbstractWallet,
  FilAccountKey,
  FilGasLimit,
  FilWalletData,
} from "./abstractWallet";
import { Client } from "../httpClient";
import { Balance, Key, Pagination } from "../types";
import {
  convertDepositAddressData,
  DepositAddressPaginationOptions,
  FilDepositAddress,
} from "./depositAddress";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import {
  BalanceDTO,
  BuildTransactionRequest,
  DepositAddressDTO,
  FlushDTO,
  FlushInternalDTO,
  PaginationDepositAddressDTO,
  PatchWalletNameRequest,
  RawFlushDTO,
  RawFlushTransactionDTO,
  RawTransactionDTO,
  TransferDTO,
  WalletBalanceDTO,
  WalletDTO,
} from "../__generate__/fil";
import BN from "bn.js";
import { BlockchainType } from "../blockchain";
import { convertWalletStatus } from "../wallet";
import { FilTransfer, FilTransferInternal } from "./transfers";
import { makeQueryString } from "../utils/url";
import { FilKeychains } from "./keychains";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import { EthTransaction } from "../eth/abstractWallet";
import cbor from "ipld-dag-cbor";
import { serializeBigNum } from "./fil-core-lib/data";
import { addressAsBytes, encode, getCID } from "./fil-core-lib/utils";
import { MethodMultisig } from "./fil-core-lib/types";
import {
  signedTransactionSerializeRaw,
  transactionSerialize,
  transactionSerializeRaw,
} from "./fil-core-lib/signer";
import {
  convertBalanceDtoToFilBalance,
  convertDtoToFlush,
  convertDtoToTransfer,
  convertFilFlushTargetToDto,
  convertMessageToObject,
  convertRawTransactionToMessage,
  convertSignedTransactionToRawSignedTransactionDTO,
  convertWalletBalanceDtoToFilBalance,
} from "./utils";
import { ProtocolIndicator } from "./fil-core-lib/constants";

export const convertWalletData = (data: WalletDTO): FilWalletData => {
  return {
    ...data,
    blockchain: BlockchainType.FILECOIN,
    status: convertWalletStatus(data.status),
  };
};

export interface FilFlush extends Omit<FlushDTO, "transfers"> {
  transfers: FilTransfer[];
}

export interface FilFlushInternal extends Omit<FlushInternalDTO, "transfers"> {
  transfers: FilTransferInternal[];
}

export type RawTransaction = RawTransactionDTO;

export interface Message {
  cid?: string;
  from: string;
  to: string;
  value: BN;
  method: number;
  params: string;
  gasLimit: number;
  gasFeeCap: BN;
  gasPremium: BN;
  version: number;
  nonce: number;
}

export interface Signature {
  data: string;
  type: number;
}

export interface SignedTransaction {
  cid: string;
  message: Message;
  signature: Signature;
}

export type RawFlushTransaction = RawFlushTransactionDTO;

export interface FilFlushTarget {
  depositAddressId: string;
  flushTransaction: SignedTransaction;
}

export class FilWallet extends FilAbstractWallet {
  constructor(client: Client, data: FilWalletData, keychains: FilKeychains) {
    super(client, data, keychains, `/wallets/${data.id}`);
  }

  async changeName(name: string): Promise<void> {
    checkNullAndUndefinedParameter({ name });
    const request: PatchWalletNameRequest = {
      name,
    };
    const walletData = await this.client.patch<WalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.data.name = walletData.name;
  }

  getAccountKey(): FilAccountKey {
    return this.data.accountKey;
  }

  getAddress(): string {
    return this.data.address;
  }

  getData(): FilWalletData {
    return this.data;
  }

  async getBalance(): Promise<Balance[]> {
    const response = await this.client.get<WalletBalanceDTO>(
      `${this.baseUrl}/balance`
    );
    return [convertWalletBalanceDtoToFilBalance(response)];
  }

  getEncryptionKey(): string {
    return this.data.encryptionKey;
  }

  getId(): string {
    return this.data.id;
  }

  updateAccountKey(key: FilAccountKey) {
    this.data.accountKey = key;
  }

  async createDepositAddress(
    name: string,
    passphrase?: string,
    otpCode?: string
  ): Promise<FilDepositAddress> {
    const wallet = await this.client.get<WalletDTO>(this.baseUrl);
    const depositAddressKey = this.keychains.derive(
      this.getAccountKey(),
      passphrase,
      wallet.nextChildNumber
    );
    const depositAddressData = await this.client.post(
      `${this.baseUrl}/deposit-addresses`,
      {
        name: name,
        childNumber: wallet.nextChildNumber,
        address: depositAddressKey.address,
        pub: depositAddressKey.pub,
        otpCode: otpCode,
      }
    );
    return new FilDepositAddress(
      this.client,
      this.data,
      this.keychains,
      depositAddressData
    );
  }

  async getDepositAddresses(
    options?: DepositAddressPaginationOptions
  ): Promise<Pagination<FilDepositAddress>> {
    const queryString = makeQueryString(options);
    const depositAddressDataList = await this.client.get<
      NoUndefinedField<PaginationDepositAddressDTO>
    >(
      `${this.baseUrl}/deposit-addresses${queryString ? `?${queryString}` : ""}`
    );

    return {
      pagination: depositAddressDataList.pagination,
      results: depositAddressDataList.results.map(
        (data) =>
          new FilDepositAddress(
            this.client,
            this.data,
            this.keychains,
            convertDepositAddressData(data)
          )
      ),
    };
  }

  async getDepositAddress(
    depositAddressId: string
  ): Promise<FilDepositAddress> {
    const depositAddressData = await this.client.get<
      NoUndefinedField<DepositAddressDTO>
    >(`${this.baseUrl}/deposit-addresses/${depositAddressId}`);
    return new FilDepositAddress(
      this.client,
      this.data,
      this.keychains,
      convertDepositAddressData(depositAddressData)
    );
  }

  async transfer(
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    gasPremium?: BN
  ): Promise<FilTransfer> {
    const rawTransaction = await this.client.post<
      NoUndefinedField<RawTransactionDTO>
    >(
      `${this.baseUrl}/transactions/build`,
      this.createBuildTransactionRequest(to, amount, gasPremium)
    );
    const signedTransaction = this.signRawTransaction(
      rawTransaction,
      this.getAccountKey(),
      passphrase,
      true
    );
    const transferData = await this.client.post<NoUndefinedField<TransferDTO>>(
      `${this.baseUrl}/transactions`,
      {
        toAddress: to,
        amount: BNConverter.bnToHexString(amount),
        proposalTransaction:
          convertSignedTransactionToRawSignedTransactionDTO(signedTransaction),
        gasPremium: BNConverter.bnToHexStringOrElseNull(gasPremium),
        otpCode: otpCode,
      }
    );
    return convertDtoToTransfer(transferData);
  }

  async flush(
    targets: Array<string>,
    passphrase: string,
    gasPremium?: BN
  ): Promise<FilFlush> {
    const rawFlushData = await this.client.post<NoUndefinedField<RawFlushDTO>>(
      `${this.baseUrl}/flushes/build`,
      {
        depositAddressIds: targets,
        gasPremium: BNConverter.bnToHexStringOrElseNull(gasPremium),
      }
    );
    const flushTargets = rawFlushData.targets.map(
      (rawFlushTransaction: RawFlushTransaction): FilFlushTarget => {
        return this.createFlushTarget(rawFlushTransaction, passphrase);
      }
    );
    const flushData = await this.client.post<NoUndefinedField<FlushDTO>>(
      `${this.baseUrl}/flushes`,
      {
        targets: flushTargets.map(convertFilFlushTargetToDto),
      }
    );
    return convertDtoToFlush(flushData);
  }

  // TODO: implement me
  async getFlushes(): Promise<Pagination<FilFlush>> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async getFlush(): Promise<FilFlush> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async getInternalFlushes(): Promise<Pagination<FilFlushInternal>> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async getInternalFlush(): Promise<FilFlushInternal> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async approve(params: ApproveWithdrawal): Promise<EthTransaction> {
    throw new Error("this feature is not supported yet");
  }

  // TODO: implement me
  async reject(params: { id: string; otpCode: string }): Promise<void> {
    throw new Error("this feature is not supported yet");
  }

  /*
   * reference
   * - https://github.com/filecoin-shipyard/filecoin.js/blob/master/src/utils/msig.ts
   * - https://github.com/filecoin-shipyard/filecoin.js/blob/master/src/providers/wallet/LightWalletProvider.ts
   */
  private createBuildTransactionRequest(
    to: string,
    amount: BN,
    gasPremium?: BN
  ): BuildTransactionRequest {
    const msgParams = [
      addressAsBytes(to),
      serializeBigNum(amount.toString(10)),
      0,
      Buffer.from([]),
    ];
    const serializedMsgParams = cbor.util.serialize(msgParams);

    return {
      version: 0,
      to: this.getAddress(),
      from: this.getAccountKey().address,
      value: BNConverter.bnToHexString(new BN(0)),
      gasLimit: BNConverter.bnToHexString(FilGasLimit.PROPOSE),
      gasPremium: BNConverter.bnToHexStringOrElseNull(gasPremium),
      method: MethodMultisig.Propose,
      params: Buffer.from(serializedMsgParams).toString("base64"),
    };
  }

  private signRawTransaction(
    rawTransaction: RawTransaction,
    key: Key,
    passphrase: string,
    fromSeed?: boolean
  ): SignedTransaction {
    const message = convertRawTransactionToMessage(rawTransaction);
    const signature = this.createMessageSignature(
      message,
      key,
      passphrase,
      fromSeed
    );
    message.cid = this.calculateCidFromMessage(message);
    const cid = this.calculateCidFromMessageAndSignature(message, signature);
    return {
      cid,
      message,
      signature,
    };
  }

  /*
   * reference
   * - https://github.com/filecoin-shipyard/filecoin.js/blob/master/src/providers/wallet/LightWalletProvider.ts
   * - https://github.com/filecoin-shipyard/filecoin.js/blob/master/src/signers/LightWalletSigner.ts
   * - https://github.com/Zondax/filecoin-signing-tools/blob/master/signer-npm/js/src/index.js
   */
  private createMessageSignature(
    message: Message,
    key: Key,
    passphrase: string,
    fromSeed?: boolean
  ): Signature {
    const msgObject = convertMessageToObject(message);
    const serializedMsg = transactionSerialize(msgObject);
    const signature = this.keychains.sign(
      key,
      passphrase,
      serializedMsg,
      fromSeed
    );
    return {
      data: signature,
      type: ProtocolIndicator.SECP256K1,
    };
  }

  /*
   * reference
   * - https://github.com/multiformats/js-cid
   */
  private calculateCidFromMessage(message: Message): string {
    const messageObject = convertMessageToObject(message);
    return new TextDecoder()
      .decode(encode(getCID(transactionSerializeRaw(messageObject))))
      .toLocaleLowerCase();
  }

  private calculateCidFromMessageAndSignature(
    message: Message,
    signature: Signature
  ): string {
    const messageObject = convertMessageToObject(message);
    return new TextDecoder()
      .decode(
        encode(getCID(signedTransactionSerializeRaw(messageObject, signature)))
      )
      .toLocaleLowerCase();
  }

  private createFlushTarget(
    rawFlushTransaction: RawFlushTransaction,
    passphrase: string
  ): FilFlushTarget {
    const rawTransaction = rawFlushTransaction.rawTransaction;
    const depositAddressKey = this.keychains.derive(
      this.getAccountKey(),
      passphrase,
      rawFlushTransaction.childNumber
    );
    const signedTransaction = this.signRawTransaction(
      rawTransaction,
      depositAddressKey,
      passphrase,
      false
    );
    return {
      depositAddressId: rawFlushTransaction.depositAddressId,
      flushTransaction: signedTransaction,
    };
  }
}
