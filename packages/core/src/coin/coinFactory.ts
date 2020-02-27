import {ETH} from "./eth";
import {OMG} from "./omg";
import {KLAY} from "./klay";
import {KCT} from "./kct";
import {Icoin} from "../interfaces/Icoin";

export type DefaultCoinConstructor = (keychains: any) => Icoin;

export class CoinFactory {
  private coinConstructor = new Map<string, DefaultCoinConstructor>();

  public getCoin(ticker: string): DefaultCoinConstructor {
    const coin = this.coinConstructor.get(ticker);
    if (coin) {
      return coin;
    } else {
      throw new Error(`unknown coin type: ${coin}`);
    }
  }

  public registerCoin(ticker: string, defaultCoin: DefaultCoinConstructor): void {
    this.coinConstructor.set(ticker, defaultCoin);
  }
}

export const GlobalCoinFactory: CoinFactory = new CoinFactory();

GlobalCoinFactory.registerCoin("eth", ETH.createInstance);
GlobalCoinFactory.registerCoin("omg", OMG.createInstance);
GlobalCoinFactory.registerCoin("klay", KLAY.createInstance);
GlobalCoinFactory.registerCoin("kct", KCT.createInstance);
