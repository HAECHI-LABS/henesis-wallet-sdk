import { Coin } from './coin';
import {
  Ticker, Drm, Eth, Hib, Klay, Hcut,
} from './coins';
import { BlockchainType } from './blockchain';

export class Factory<T> {
  private c = new Map<string, T>();

  public get(name: string): T {
    const coin = this.c.get(name);
    if (coin) {
      return coin;
    }
    throw new Error(`unknown type: ${coin}`);
  }

  public register(name: string, item: T): this {
    this.c.set(name, item);
    return this;
  }
}

export const GlobalCoinFactoryGenerator: Factory<Factory<Coin>> = new Factory<Factory<Coin>>();
GlobalCoinFactoryGenerator.register(
  BlockchainType.Ethereum,
  new Factory<Coin>()
    .register(Ticker.Eth, new Eth())
    .register(Ticker.Hcut, new Hcut())
    .register(Ticker.Drm, new Drm()),
);

GlobalCoinFactoryGenerator.register(
  BlockchainType.Klaytn,
  new Factory<Coin>()
    .register(Ticker.Klay, new Klay())
    .register(Ticker.Hib, new Hib()),
);
