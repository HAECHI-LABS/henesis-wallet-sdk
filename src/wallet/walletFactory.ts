import {EthereumWallet} from "./ethereumWallet";
import {KlaytnWallet} from "./klaytnWallet";

export type DefaultWalletConstructor = Function;

export class WalletFactory {
  private walletConstructor = new Map<string, DefaultWalletConstructor>();

  public getWallet(blockchain: string): Function {
    const coin = this.walletConstructor.get(blockchain);
    if (coin) {
      return coin;
    } else {
      throw new Error(`unknown coin type: ${coin}`);
    }
  }

  public registerWallet(blockchain: string, walletConstructor: Function): void {
    this.walletConstructor.set(blockchain, walletConstructor);
  }
}

export const GlobalWalletFactory:WalletFactory = new WalletFactory();
GlobalWalletFactory.registerWallet("ethereum",EthereumWallet.createInstance);
GlobalWalletFactory.registerWallet("klaytn",KlaytnWallet.createInstance);