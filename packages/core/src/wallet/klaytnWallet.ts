import {Client} from "../sdk";
import {WalletInformation} from "../wallets";
import {IEthereumWallet, IWallet, PayloadAndSignature, Transaction} from "../interfaces/Iwallet";
import {GlobalCoinFactory} from "../coin/coinFactory";

export class KlaytnWallet implements IEthereumWallet{
  private client: Client;
  private keychains: any;
  private walletInformation: WalletInformation;
  static REGISTERED_TICKER = ["klay","kct"];

  constructor(client: Client, keychains: any, walletInformation: WalletInformation) {
    this.client = client;
    this.keychains = keychains;
    this.walletInformation = walletInformation;
  }

  static createInstance(client: Client, keychains: any, walletInformation: WalletInformation) {
    return new KlaytnWallet(client, keychains, walletInformation);
  }

  public transfer(
      ticker: string,
      to: string,
      value: number,
      passphrase: string
  ): Transaction {
    const coin = this.getCoinConstructor("klay")(this.keychains);
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
    const nativeCoin = this.getCoinConstructor("klay")(this.keychains);
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
    if(!KlaytnWallet.REGISTERED_TICKER.includes(ticker)){
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


  public createUserWallet(name, passphrase): Promise<WalletInformation> {
    return undefined;
  }
}