import { Client } from "../httpClient";
import { BtcSubModule } from "./module";
import { BTCKeychains } from "./keychains";
import BN from "bn.js";
import { Key } from "../types";
import { address, Transaction as BitcoinTransaction, script, networks, Psbt, TransactionBuilder } from "bitcoinjs-lib";
import { BNConverter } from "../utils";
import { bitcoin } from "bitcoinjs-lib/types/networks";

export abstract class BTCWallet {
  protected readonly client: Client;
}

export interface RawTransaction {
  inputs: TransactionOutput[],
  outputs: RawTransactionOutput[]
}

export interface TransactionOutput {
  transactionId: string;
  outputIndex: number;
  address: string;
  scriptPubKey: string;
  amount: string;
  spentTransactionId: string;
  spentInputIndex: number;
}

export interface RawTransactionOutput {
  to: string;
  amount: string;
}

export interface CreateRawTransaction {
  inputs: {
    transactionOutput: TransactionOutput,
    accountSignature: string
  }[],
  outputs: RawTransactionOutput[];
}

export interface BTCMasterWalletData {
  id: string;
  name: string;
  address: string;
  orgId: string;
  accountKey: Key;
  redeemScript: string;
}

export interface Transaction {
  id: string;
  hex: string;
  inputs: TransactionOutput[],
  outputs: TransactionOutput[]
}

export class BTCMasterWallet extends BtcSubModule {
  protected readonly client: Client;

  private readonly keychains: BTCKeychains;

  private readonly data: BTCMasterWalletData;

  private readonly baseUrl: string;

  public constructor(data: BTCMasterWalletData, client: Client, keychains: BTCKeychains) {
    super();
    this.data = data;
    this.client = client;
    this.keychains = keychains;
    this.baseUrl = this.getBaseUrl() + "/wallets";
  }

  public getData(): BTCMasterWalletData {
    return this.data;
  }

  public async transfer(to: string, amount: BN, passphrase: string) {
    const rawTransaction: RawTransaction = await this.createRawTransaction(to, amount);
    const tx = new BitcoinTransaction();
    rawTransaction.inputs.forEach(input => {
      tx.addInput(
        new Buffer(new Buffer(input.transactionId.slice(2), "hex").reverse()),
        input.outputIndex
      );
    });

    rawTransaction.outputs.forEach(output =>{
      tx.addOutput(
        address.toOutputScript(output.to, networks.testnet),
        new BN(output.amount.slice(2), "hex").toNumber()
      );
    });

    const accountSigs = [];
    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      const sigHash: Buffer = tx.hashForSignature(
        i,
        new Buffer(this.data.redeemScript.slice(2),"hex"),
        BitcoinTransaction.SIGHASH_ALL
      );
      const hash: Buffer = this.keychains.sign(this.data.accountKey, passphrase, sigHash);
      const accountSig = script.signature.encode(hash, BitcoinTransaction.SIGHASH_ALL).toString("hex");
      accountSigs.push(accountSig);
    }

    const payload: CreateRawTransaction = {
      inputs: [],
      outputs: []
    };

    for (let i = 0; i < rawTransaction.inputs.length; i++) {
      payload.inputs.push({
        transactionOutput: rawTransaction.inputs[i],
        accountSignature: accountSigs[i]
      });
    }

    for (let i = 0; i < rawTransaction.outputs.length; i++) {
      payload.outputs.push(rawTransaction.outputs[i]);
    }

    return await this.client.post<Transaction>(
      `${this.baseUrl}/${this.data.id}/transactions`,
      payload
    );
  }

  private async createRawTransaction(to: string, amount: BN): Promise<RawTransaction> {
    return await this.client.post<RawTransaction>(`${this.baseUrl}/${this.data.id}/raw-transactions`, {
      to,
      amount: BNConverter.bnToHexString(amount)
    });
  }
}