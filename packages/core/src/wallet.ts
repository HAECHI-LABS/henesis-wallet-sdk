import {WalletInformation} from "./wallets";
import {Client, SDK} from "./sdk";
import {DefaultEthereumTransactionFactory} from "./transaction/factory";
import {DefaultSignerFactory} from "./signer/factory";
import {DefaultSigner} from "./signer/defaultSigner";
import {MultiSignaturePayload} from "./multiSignaturePayload";
import {Erc20TransferTransaction} from "./transaction/erc20TransferTransaction";
import {KeyFile} from "./accounts";

export interface Transaction {

}

export class Wallet {
  private client: Client;
  public walletInformation: WalletInformation;
  private baseUrl: string = "/wallets";
  private signer: DefaultSigner;
  private transactionFactory: any;

  constructor(
      client: Client,
      walletInformation: WalletInformation
  ) {
    this.client = client;
    this.walletInformation = walletInformation;
    this.signer = DefaultSignerFactory.getSigner(this.walletInformation.blockchain);
    this.transactionFactory = DefaultEthereumTransactionFactory;// TODO bitcoin tx시 factory의 factory필요.
  }

  public async sendFund(
      to: string,
      value: number,
      passphrase: string
  ): Promise<Transaction> {
    const payload: MultiSignaturePayload = this.transactionFactory.getTransaction("eth")
        .buildRaw(to, value, "0x0");
    return this.sendTransaction(
        this.walletInformation.id,
        this.walletInformation.blockchain,
        payload,
        this.signer.generateSignature(payload, this.walletInformation.accountKey, passphrase),
        passphrase
    )
  }

  public async sendToken(
      to: string,
      value: number,
      tokenContractAddress: string,
      passphrase: string
  ): Promise<Transaction> {
    const payload: MultiSignaturePayload = this.transactionFactory
        .getTransaction("erc20")
        .build(to, value, tokenContractAddress);
    return this.sendTransaction(
        this.walletInformation.id,
        this.walletInformation.blockchain,
        payload,
        this.signer.generateSignature(payload, this.walletInformation.accountKey, passphrase),
        passphrase
    );
  }

  private async sendTransaction(
      walletId: string,
      blockchain: string,
      multiSignaturePayload: MultiSignaturePayload,
      signature: string,
      passphrase: string
  ): Promise<Transaction> {
    const payload = {walletId, blockchain, multiSignaturePayload, signature, passphrase};
    try {
      payload["nonce"] = this.getNextNonce();
    } catch (e) {

    }
    return await this.client.post(`${this.baseUrl}/transactions`, payload) as Transaction;
  }

  private getNextNonce(): bigint {
    return null;
  }

}