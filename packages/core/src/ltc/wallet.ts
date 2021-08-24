import { Client } from "../httpClient";
import BN from "bn.js";
import {
  Balance,
  Key,
  Keychains,
  Pagination,
  PaginationOptions,
  Timestamp,
} from "../types";
import {
  address,
  script,
  Transaction as LitecoinTransaction,
} from "bitcoinjs-lib";
import { BNConverter, checkNullAndUndefinedParameter } from "../utils/common";
import {
  ActivatingMasterWallet,
  convertWalletStatus,
  Wallet,
  WalletData,
} from "../wallet";
import { BlockchainType } from "../blockchain";
import {
  ActivateMasterWalletRequest,
  ApproveWithdrawalApprovalRequest,
  BalanceDTO,
  DepositAddressDTO,
  EstimatedFeeDTO,
  KeyDTO,
  MasterWalletDTO,
  PatchWalletNameRequest,
  RawTransactionDTO,
  RejectWithdrawalApprovalRequest,
  TransactionDTO,
  TransactionOutputDTO,
  TransferDTO,
} from "../__generate__/ltc";
import { makeQueryString } from "../utils/url";
import { Env } from "../sdk";
import _ from "lodash";
import { Transfer } from "./transfers";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import {
  createDepositAddressApi,
  getDepositAddressApi,
} from "../apis/ltc/wallet";
import { convertTransferDTO } from "./utils";
import { litecoinMainnet, litecoinTestnet } from "./network";

export interface LtcTransaction
  extends Omit<
    TransactionDTO,
    "outputs" | "blockNumber" | "feeAmount" | "amount"
  > {
  blockNumber?: BN;
  feeAmount?: BN;
  amount: BN;
  outputs: LtcTransactionOutput[];
}

export interface LtcEstimatedFee {
  estimatedFee: string;
}

export interface LtcRawTransaction {
  inputs: LtcRawTransactionInput[];
  outputs: LtcRawTransactionOutput[];
}

export interface LtcTransactionOutput
  extends Omit<TransactionOutputDTO, "amount"> {
  amount: BN;
}

export interface LtcRawTransactionInput {
  redeemScript: string;
  transactionOutput: LtcTransactionOutput;
}

export interface LtcRawTransactionOutput {
  to: string;
  amount: string;
  isChange: boolean;
}

export interface LtcCreateTransactionOutput
  extends Omit<LtcTransactionOutput, "amount"> {
  amount: string;
}

export interface LtcSignedRawTransactionRequest
  extends LtcSignedRawTransaction {
  originTo?: string;
  otpCode?: string;
}

export interface LtcSignedRawTransaction {
  inputs: {
    transactionOutput: LtcCreateTransactionOutput;
    accountSignature: string;
  }[];
  outputs: LtcRawTransactionOutput[];
}

export interface LtcMasterWalletData extends WalletData {
  orgId: string;
  accountKey: Key;
  whitelistActivated: boolean;
}

export type DepositAddress = DepositAddressDTO;

export interface DepositAddressPaginationOptions extends PaginationOptions {
  start?: Timestamp;
  end?: Timestamp;
  name?: string;
  id?: string;
  address?: string;
}

export interface LtcWithdrawalApproveParams extends ApproveWithdrawal {}

export interface LtcActivatingMasterWallet extends ActivatingMasterWallet {}

export const transformWalletData = (
  data: MasterWalletDTO
): LtcMasterWalletData => {
  return {
    ...data,
    status: convertWalletStatus(data.status),
  };
};

export class LtcMasterWallet extends Wallet<LtcTransaction> {
  private readonly data: LtcMasterWalletData;
  private readonly env: Env;

  constructor(
    data: LtcMasterWalletData,
    client: Client,
    keychains: Keychains,
    env: Env
  ) {
    super(client, keychains, `/wallets/${data.id}`, BlockchainType.LITECOIN);
    this.data = data;
    this.env = env;
  }

  async build(
    to: string,
    amount: BN,
    passphrase: string,
    feeRate?: BN,
    metadata?: string
  ): Promise<LtcSignedRawTransaction> {
    checkNullAndUndefinedParameter({ to, passphrase });
    const rawTransaction: LtcRawTransaction = await this.createRawTransaction(
      to,
      amount,
      feeRate,
      metadata
    );
    const tx = new LitecoinTransaction();
    rawTransaction.inputs.forEach((input) => {
      tx.addInput(
        new Buffer(
          new Buffer(input.transactionOutput.transactionId, "hex").reverse()
        ),
        input.transactionOutput.outputIndex
      );
    });

    rawTransaction.outputs.forEach((output) => {
      tx.addOutput(
        address.toOutputScript(
          output.to,
          this.env === Env.Prod ? litecoinMainnet : litecoinTestnet
        ),
        new BN(output.amount.slice(2), "hex").toNumber()
      );
    });

    const accountSigs = [];
    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      const sigHash: Buffer = tx.hashForSignature(
        i,
        new Buffer(rawTransaction.inputs[i].redeemScript.slice(2), "hex"),
        LitecoinTransaction.SIGHASH_ALL
      );
      const hexHash: string = this.keychains.sign(
        this.data.accountKey,
        passphrase,
        sigHash.toString("hex")
      );
      const accountSig = script.signature
        .encode(Buffer.from(hexHash, "hex"), LitecoinTransaction.SIGHASH_ALL)
        .toString("hex");
      accountSigs.push(accountSig);
    }

    const payload: LtcSignedRawTransaction = {
      inputs: [],
      outputs: [],
    };

    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      const transactionOutput = rawTransaction.inputs[i].transactionOutput;
      payload.inputs.push({
        transactionOutput: {
          ...transactionOutput,
          amount: BNConverter.bnToHexString(transactionOutput.amount),
        },
        accountSignature: accountSigs[i],
      });
    }

    for (let i = 0; i < rawTransaction.outputs.length; i++) {
      payload.outputs.push(rawTransaction.outputs[i]);
    }

    return payload;
  }

  async transfer(
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string,
    feeRate?: BN,
    metadata?: string
  ): Promise<Transfer> {
    return this.sendSignedTransaction({
      ...(await this.build(to, amount, passphrase, feeRate, metadata)),
      originTo: to,
      otpCode: otpCode,
    });
  }

  async sendSignedTransaction(
    signedRawTransactionRequest: LtcSignedRawTransactionRequest
  ): Promise<Transfer> {
    const transfer = await this.client.post<TransferDTO>(
      `${this.baseUrl}/transactions`,
      signedRawTransactionRequest
    );

    return convertTransferDTO(transfer);
  }

  async createRawTransaction(
    to: string,
    amount: BN,
    feeRate?: BN,
    metadata?: string
  ): Promise<LtcRawTransaction> {
    const response = await this.client.post<RawTransactionDTO>(
      `${this.baseUrl}/raw-transactions`,
      {
        to,
        amount: BNConverter.bnToHexString(amount),
        feeRate: feeRate ? BNConverter.bnToHexString(feeRate) : undefined,
        metadata: metadata,
      }
    );
    return {
      inputs: _.map(response.inputs, (input) => {
        return {
          redeemScript: input.redeemScript,
          transactionOutput: {
            ...input.transactionOutput,
            amount: BNConverter.hexStringToBN(
              String(input.transactionOutput.amount)
            ),
          },
        };
      }),
      outputs: _.map(response.outputs, (output) => {
        return {
          to: output.to,
          amount: String(output.amount),
          isChange: output.isChange,
        };
      }),
    };
  }

  async getEstimatedFee(): Promise<LtcEstimatedFee> {
    const response = await this.client.get<EstimatedFeeDTO>(
      `${this.baseUrl}/estimated-fee`
    );
    return {
      estimatedFee: String(response.estimatedFee),
    };
  }

  getChain(): BlockchainType {
    return this.blockchain;
  }

  async getBalance(): Promise<Balance[]> {
    const response = await this.client.get<BalanceDTO>(
      `${this.baseUrl}/balance`
    );
    return [
      {
        coinId: null,
        symbol: "LTC",
        amount: BNConverter.hexStringToBN(String(response.balance)),
        spendableAmount: BNConverter.hexStringToBN(
          String(response.spendableBalance)
        ),
        coinType: "LTC",
        name: "Litecoin",
        decimals: 8,
      },
    ];
  }

  createDepositAddress(
    name: string,
    otpCode?: string
  ): Promise<DepositAddress> {
    checkNullAndUndefinedParameter({ name });
    return createDepositAddressApi({
      client: this.client,
      walletId: this.data.id,
      request: {
        name,
        otpCode,
      },
    });
  }

  getDepositAddress(depositAddressId: string): Promise<DepositAddress> {
    return getDepositAddressApi({
      client: this.client,
      walletId: this.data.id,
      depositAddressId,
    });
  }

  getDepositAddresses(
    options?: DepositAddressPaginationOptions
  ): Promise<Pagination<DepositAddress>> {
    const queryString = makeQueryString(options);
    return this.client.get<Pagination<DepositAddressDTO>>(
      `${this.baseUrl}/deposit-addresses${queryString ? `?${queryString}` : ""}`
    );
  }

  async approve(params: LtcWithdrawalApproveParams): Promise<Transfer> {
    const request: ApproveWithdrawalApprovalRequest = {
      ...(await this.build(params.toAddress, params.amount, params.passphrase)),
      originTo: params.toAddress,
      otpCode: params.otpCode,
    };

    const transfer = await this.client.post<TransferDTO>(
      `${this.withdrawalApprovalUrl}/${params.id}/approve`,
      request
    );
    return convertTransferDTO(transfer);
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

  getAddress(): string {
    return this.data.address;
  }

  getData(): LtcMasterWalletData {
    return this.data;
  }

  getId(): string {
    return this.data.id;
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

  async changeName(name: string): Promise<void> {
    checkNullAndUndefinedParameter({ name });
    const request: PatchWalletNameRequest = {
      name,
    };
    const ltcWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.data.name = ltcWalletData.name;
  }

  async activate(
    accountKey: Key,
    backupKey: Key
  ): Promise<LtcActivatingMasterWallet> {
    const params: ActivateMasterWalletRequest = {
      accountKey: {
        pub: accountKey.pub,
        keyFile: undefined,
      } as KeyDTO,
      backupKey: {
        pub: backupKey.pub,
        keyFile: undefined,
      } as KeyDTO,
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
      blockchain: BlockchainType.LITECOIN,
      address,
      status,
      createdAt,
      updatedAt,
    };
  }
}
