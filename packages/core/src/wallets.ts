import {Wallet} from "./wallet";
import {Client, SDK} from "./sdk";
import {KeyFile, KeySecret} from "./accounts";
import {DefaultSignerFactory, SignerFactory} from './signer/factory'
import {DefaultEthereumTransactionFactory, EthereumTransactionFactory} from "./transaction/factory";
import {CreateUserWalletTransaction} from "./transaction/createUserWalletTransaction";



export interface WalletInformation {
  id: string;
  name: string;
  walletType: string;
  address: string;
  blockchain: string;
  createdAt: string;
  backupKey: KeyFile;
  accountKey: KeyFile;
}

export type createMasterWalletFunction = (name: string, blockchain: string) => Promise<Wallet>;
export type createUserWalletFunction = (name: string, blockchain: string, masterWalletId: string) => Promise<Wallet>;
export type getWalletByIdFunction = (walletId: string) => Promise<Wallet>;

export class Wallets {
  private client: Client;
  private baseUrl = "/wallets";
  private signerFactory: SignerFactory;
  private transactionFactory: EthereumTransactionFactory;

  constructor(client: Client) {
    this.client = client;
    this.signerFactory = DefaultSignerFactory;
    this.transactionFactory = DefaultEthereumTransactionFactory;
  }

  public masterWallet() {
    return {
      find: this.getMasterWalletById as getWalletByIdFunction,
      create: this.createMasterWallet as createMasterWalletFunction
    }
  }

  public userWallet() {
    return {
      find: this.getUserWalletById as getWalletByIdFunction,
      create: this.createUserWallet as createUserWalletFunction
    }
  }

  private async createMasterWallet(name: string, blockchain: string): Promise<Wallet> {
    const payload: any = {name, blockchain};
    try {
      payload["accountKey"] = this.signerFactory.getSigner(blockchain).generateKeySecret();
      payload["backupKey"] = this.signerFactory.getSigner(blockchain).generateKeySecret();
    } catch (e) {
      //TODO error handle
    }
    //TODO validete return value
    const walletInformation = await this.client.post<WalletInformation>(`${this.baseUrl}/`, payload);
    return new Wallet(this.client, walletInformation);
  }

  private async createUserWallet(name: string, blockchain: string, masterWalletId: string, passphrase: string): Promise<Wallet> {
    const payload: any = {name, blockchain, masterWalletId};
    const masterWalletInformation: WalletInformation = (await this.getMasterWalletById(masterWalletId)).walletInformation;
    const {address: masterWalletAddress, accountKey: masterWalletAccountKey} = masterWalletInformation;
    const createUserWalletTransaction =
        (this.transactionFactory.getTransaction("createUserWallet")
            .setNonce(await Wallet.getNextSequenceId(masterWalletId)) as CreateUserWalletTransaction)
            .build(masterWalletAddress);
    try {
      payload["signature"] = this.signerFactory
          .getSigner(blockchain)
          .generateSignature(
              createUserWalletTransaction,
              masterWalletAccountKey,
              passphrase
          );
    } catch (e) {
      //TODO error handle
    }
    payload["multiSignaturePayload"] = createUserWalletTransaction;

    //TODO validate return value
    const walletInformation = await this.client.post<WalletInformation>(`/v1/wallets/${payload.masterWalletId}/user-wallets`);
    return new Wallet(this.client, walletInformation);
  }

  private async getMasterWalletById(walletId: string): Promise<Wallet> {
    const walletInformation: WalletInformation = await this.client.post<WalletInformation>(`${this.baseUrl}/${walletId}`);
    return new Wallet(this.client, walletInformation);
  }

  private async getUserWalletById(masterWalletId: string, userWalletId: string): Promise<Wallet> {
    const walletInformation: WalletInformation = await this.client.post<WalletInformation>(`${this.baseUrl}/${masterWalletId}/user-wallets/${userWalletId}`);
    return new Wallet(this.client, walletInformation);
  }
}