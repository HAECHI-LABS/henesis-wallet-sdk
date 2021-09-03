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
  networks,
  script,
  Transaction as BitcoinTransaction,
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
} from "../__generate__/btc";
import { makeQueryString } from "../utils/url";
import { Env } from "../sdk";
import _ from "lodash";
import { Transfer } from "./transfers";
import { ApproveWithdrawal } from "../withdrawalApprovals";
import {
  createDepositAddressApi,
  getDepositAddressApi,
} from "../apis/btc/wallet";
import {
  convertTransferDTO,
  encodeScriptSignature,
  toLegacyAddress,
} from "./utils";

export interface BchTransaction
  extends Omit<
    TransactionDTO,
    "outputs" | "blockNumber" | "feeAmount" | "amount"
  > {
  blockNumber?: BN;
  feeAmount?: BN;
  amount: BN;
  outputs: BchTransactionOutput[];
}

export interface BchEstimatedFee {
  estimatedFee: string;
}

export interface BchRawTransaction {
  inputs: BchRawTransactionInput[];
  outputs: BchRawTransactionOutput[];
}

export interface BchTransactionOutput
  extends Omit<TransactionOutputDTO, "amount"> {
  amount: BN;
}

export interface BchRawTransactionInput {
  redeemScript: string;
  transactionOutput: BchTransactionOutput;
}

export interface BchRawTransactionOutput {
  to: string;
  amount: string;
  isChange: boolean;
}

export interface BchCreateTransactionOutput
  extends Omit<BchTransactionOutput, "amount"> {
  amount: string;
}

export interface BchSignedRawTransactionRequest
  extends BchSignedRawTransaction {
  to?: string;
  otpCode?: string;
}

export interface BchSignedRawTransaction {
  inputs: {
    transactionOutput: BchCreateTransactionOutput;
    accountSignature: string;
  }[];
  outputs: BchRawTransactionOutput[];
}

export interface BchMasterWalletData extends WalletData {
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

export interface BchWithdrawalApproveParams extends ApproveWithdrawal {}

export interface BchActivatingMasterWallet extends ActivatingMasterWallet {}

export const transformWalletData = (
  data: MasterWalletDTO
): BchMasterWalletData => {
  return {
    ...data,
    status: convertWalletStatus(data.status),
  };
};

export class BchMasterWallet extends Wallet<BchTransaction> {
  private readonly data: BchMasterWalletData;
  private readonly env: Env;

  constructor(
    data: BchMasterWalletData,
    client: Client,
    keychains: Keychains,
    env: Env
  ) {
    super(client, keychains, `/wallets/${data.id}`, BlockchainType.BITCOIN);
    this.data = data;
    this.env = env;
  }

  async build(
    to: string,
    amount: BN,
    passphrase: string,
    feeRate?: BN,
    metadata?: string
  ): Promise<BchSignedRawTransaction> {
    checkNullAndUndefinedParameter({ to, passphrase });
    const rawTransaction: BchRawTransaction = await this.createRawTransaction(
      to,
      amount,
      feeRate,
      metadata
    );
    const tx = new BitcoinTransaction();
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
          toLegacyAddress(output.to),
          this.env === Env.Prod ? networks.bitcoin : networks.testnet
        ),
        new BN(output.amount.slice(2), "hex").toNumber()
      );
    });

    const accountSigs = [];
    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      const sigHash: Buffer = tx.hashForWitnessV0(
        i,
        new Buffer(rawTransaction.inputs[i].redeemScript.slice(2), "hex"),
        rawTransaction.inputs[i].transactionOutput.amount.toNumber(),
        // this is to use bitcoinjs-lib for bch. bitcoin cash use sigHash 'FORKID' and bitcoinjs-lib cannot translate 'FORKID'. bitcoin cash signing logic use hasType as 65 internally.
        65
      );
      const hexHash: string = this.keychains.sign(
        this.data.accountKey,
        passphrase,
        sigHash.toString("hex")
      );
      const accountSig = encodeScriptSignature(
        Buffer.from(hexHash, "hex"),
        // this is to use bitcoinjs-lib for bch. bitcoin cash use sigHash 'FORKID' and bitcoinjs-lib cannot translate 'FORKID'. bitcoin cash signing logic use hasType as 65 internally.
        65
      ).toString("hex");
      accountSigs.push(accountSig);
    }

    const payload: BchSignedRawTransaction = {
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
      to,
      otpCode: otpCode,
    });
  }

  async sendSignedTransaction(
    signedRawTransactionRequest: BchSignedRawTransactionRequest
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
  ): Promise<BchRawTransaction> {
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

  async getEstimatedFee(): Promise<BchEstimatedFee> {
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
        symbol: "BCH",
        amount: BNConverter.hexStringToBN(String(response.balance)),
        spendableAmount: BNConverter.hexStringToBN(
          String(response.spendableBalance)
        ),
        coinType: "BCH",
        name: "Bitcoin",
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

  async approve(params: BchWithdrawalApproveParams): Promise<Transfer> {
    const request: ApproveWithdrawalApprovalRequest = {
      ...(await this.build(params.toAddress, params.amount, params.passphrase)),
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

  getData(): BchMasterWalletData {
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
    const bchWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.baseUrl}/name`,
      request
    );
    this.data.name = bchWalletData.name;
  }

  async activate(
    accountKey: Key,
    backupKey: Key
  ): Promise<BchActivatingMasterWallet> {
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
      blockchain: BlockchainType.BITCOIN,
      address,
      status,
      createdAt,
      updatedAt,
    };
  }
}
