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
import {
  BNConverter,
  parseResponseToTransfer,
  checkNullAndUndefinedParameter,
} from "../utils/common";
import { Wallet, WalletData } from "../wallet";
import { BlockchainType } from "../blockchain";
import {
  CreateDepositAddressDTO,
  DepositAddressDTO,
  TransactionDTO,
  TransactionOutputDTO,
  RawTransactionDTO,
  EstimatedFeeDTO,
  BalanceDTO,
  MasterWalletDTO,
  TransferDTO,
} from "../__generate__/btc";
import { makeQueryString } from "../utils/url";
import { Env } from "../sdk";
import _ from "lodash";
import { Transfer } from "./transfers";

export interface BtcTransaction {
  id: string;
  hex: string;
  transactionHash: string;
  blockNumber: BN;
  feeAmount?: BN;
  amount: BN;
  outputs: BtcTransactionOutput[];
  createdAt: string;
}

export interface BtcEstimatedFee {
  estimatedFee: string;
}

export interface BtcBalance {
  balance: string;
  spendableBalance: string;
}

export interface BtcRawTransaction {
  inputs: BtcRawTransactionInput[];
  outputs: BtcRawTransactionOutput[];
}

export interface BtcTransactionOutput {
  transactionId: string;
  outputIndex: number;
  address: string;
  scriptPubKey: string;
  amount: BN;
  isChange: boolean;
}

export interface BtcRawTransactionInput {
  redeemScript: string;
  transactionOutput: BtcTransactionOutput;
}

export interface BtcRawTransactionOutput {
  to: string;
  amount: string;
  isChange: boolean;
}

export interface BtcCreateTransactionOutput
  extends Omit<BtcTransactionOutput, "amount"> {
  amount: string;
}

export interface BtcCreateRawTransaction {
  inputs: {
    transactionOutput: BtcCreateTransactionOutput;
    accountSignature: string;
  }[];
  outputs: BtcRawTransactionOutput[];
  otpCode: string;
}

export interface BtcMasterWalletData extends WalletData {
  orgId: string;
  accountKey: Key;
}

export interface CreateMasterWalletResponse {
  id: string;
  name: string;
  orgId: string;
  henesisKey: Key;
  encryptionKey: string;
  createdAt: Timestamp;
}

export type DepositAddress = DepositAddressDTO;

export interface DepositAddressPaginationOptions extends PaginationOptions {
  start?: Timestamp;
  end?: Timestamp;
  name?: string;
  id?: string;
  address?: string;
}

export class BtcMasterWallet extends Wallet<BtcTransaction> {
  private readonly data: BtcMasterWalletData;
  private readonly env: Env;

  public constructor(
    data: BtcMasterWalletData,
    client: Client,
    keychains: Keychains,
    env: Env
  ) {
    super(client, keychains);
    this.data = data;
    this.env = env;
  }

  public async transfer(
    to: string,
    amount: BN,
    passphrase: string,
    otpCode?: string
  ): Promise<Transfer> {
    checkNullAndUndefinedParameter({ to, passphrase });
    const rawTransaction: BtcRawTransaction = await this.createRawTransaction(
      to,
      amount
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
          output.to,
          this.env === Env.Prod ? networks.bitcoin : networks.testnet
        ),
        new BN(output.amount.slice(2), "hex").toNumber()
      );
    });

    const accountSigs = [];
    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      const sigHash: Buffer = tx.hashForSignature(
        i,
        new Buffer(rawTransaction.inputs[i].redeemScript.slice(2), "hex"),
        BitcoinTransaction.SIGHASH_ALL
      );
      const hexHash: string = this.keychains.sign(
        this.data.accountKey,
        passphrase,
        sigHash.toString("hex")
      );
      const accountSig = script.signature
        .encode(Buffer.from(hexHash, "hex"), BitcoinTransaction.SIGHASH_ALL)
        .toString("hex");
      accountSigs.push(accountSig);
    }

    const payload: BtcCreateRawTransaction = {
      inputs: [],
      outputs: [],
      otpCode: otpCode,
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

    const transfer = await this.client.post<TransferDTO>(
      `${this.getBaseUrl()}/transactions`,
      payload
    );

    return parseResponseToTransfer(transfer);
  }

  private async createRawTransaction(
    to: string,
    amount: BN
  ): Promise<BtcRawTransaction> {
    const response = await this.client.post<RawTransactionDTO>(
      `${this.getBaseUrl()}/raw-transactions`,
      {
        to,
        amount: BNConverter.bnToHexString(amount),
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

  public async getEstimatedFee(): Promise<BtcEstimatedFee> {
    const response = await this.client.get<EstimatedFeeDTO>(
      `${this.getBaseUrl()}/estimated-fee`
    );
    return {
      estimatedFee: String(response.estimatedFee),
    };
  }

  getChain(): BlockchainType {
    return BlockchainType.BitCoin;
  }

  async getBalance(): Promise<Balance[]> {
    const response = await this.client.get<BalanceDTO>(
      `${this.getBaseUrl()}/balance`
    );
    return [
      {
        symbol: "BTC",
        amount: BNConverter.hexStringToBN(String(response.balance)),
        spendableAmount: BNConverter.hexStringToBN(
          String(response.spendableBalance)
        ),
        coinType: "BTC",
        name: "비트코인",
      },
    ];
  }

  async createDepositAddress(name: string): Promise<DepositAddress> {
    checkNullAndUndefinedParameter({ name });
    const params: CreateDepositAddressDTO = { name };
    const response = await this.client.post<DepositAddressDTO>(
      `${this.getBaseUrl()}/deposit-addresses`,
      params
    );
    return response;
  }

  async getDepositAddress(depositAddressId: string): Promise<DepositAddress> {
    const response = await this.client.get<DepositAddressDTO>(
      `${this.getBaseUrl()}/deposit-addresses/${depositAddressId}`
    );
    return response;
  }

  async getDepositAddresses(
    options?: DepositAddressPaginationOptions
  ): Promise<Pagination<DepositAddress>> {
    const queryString: string = makeQueryString(options);
    return await this.client.get<Pagination<DepositAddressDTO>>(
      `${this.getBaseUrl()}/deposit-addresses${
        queryString ? `?${queryString}` : ""
      }`
    );
  }

  getAddress(): string {
    return this.data.address;
  }

  getData(): BtcMasterWalletData {
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

  async changeName(name: string) {
    checkNullAndUndefinedParameter({ name });
    const btcWalletData = await this.client.patch<MasterWalletDTO>(
      `${this.getBaseUrl()}/name`,
      {
        name,
      }
    );
    this.data.name = btcWalletData.name;
  }

  getBaseUrl(): string {
    return `${this.baseUrl}/${this.data.id}`;
  }
}
