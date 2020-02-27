import {Client} from "../sdk";
import {WalletInformation} from "../wallets";
import {IEthereumWallet, IWallet, PayloadAndSignature, Transaction} from "../interfaces/Iwallet";
import {GlobalCoinFactory} from "../coin/coinFactory";

export class EthereumWallet implements IEthereumWallet{
  private client: Client;
  private keychains: any;
  private walletInformation: WalletInformation;
  private baseUrl = "/wallets"
  static REGISTERED_TICKER = ["eth","omg"];

  constructor(client: Client, keychains: any, walletInformation: WalletInformation) {
    this.client = client;
    this.keychains = keychains;
    this.walletInformation = walletInformation;
  }

  static createInstance(client: Client, keychains: any, walletInformation: WalletInformation) {
    return new EthereumWallet(client, keychains, walletInformation);
  }

  public transfer(
      ticker: string,
      to: string,
      value: number,
      passphrase: string
  ): Transaction {
    const coin = this.getCoinConstructor(ticker)(this.keychains);
    const payloadAndSignature: PayloadAndSignature = coin.transfer(
        to,
        value,
        this.walletInformation.address,
        passphrase
    );
    return this.sendTransaction(
        to,
        value,
        payloadAndSignature
    );
  }

  private sendTransaction(
      to: string,
      value: number,
      payloadAndSignaure: PayloadAndSignature
  ): Transaction {
    return null;
  }

  public contractCall(contractAddress: string, value: number, data:string, passphrase: string): Transaction {
    const nativeCoin = this.getCoinConstructor("eth")(this.keychains);
    const payloadAndSignature: PayloadAndSignature = nativeCoin.transfer(
        contractAddress,
        value,
        this.walletInformation.address,
        passphrase,
        data
    );
    return null;
  }

  private getCoinConstructor(ticker) {
    if(!EthereumWallet.REGISTERED_TICKER.includes(ticker)){
      throw Error(`ticker:${ticker} is not registered`);
    }
    return GlobalCoinFactory.getCoin(ticker);
  }

  public getWalletSequenceId():number {
    return null;
  }

  public getAddress():string {
    return this.walletInformation.address;
  }

  public async createUserWallet(name, passphrase): Promise<WalletInformation> {
    //TODO make contract call data
    const nativeCoin = this.getCoinConstructor("eth")(this.keychains);
    const payloadAndSignature: PayloadAndSignature = nativeCoin.transfer(
        this.walletInformation.address,
        0,
        this.walletInformation.address,
        passphrase,
        "data"
    );
    return await this.client.post<WalletInformation>(`${this.baseUrl}/${this.walletInformation.id}/user-wallets`)
  }
}