import { Coin } from './coin';
import { Coins, Eth, Hib, Klay } from './coins';
import { Blockchain } from './blockchain';

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
  Blockchain.Ethereum,
  new Factory<Coin>().register(Coins.Eth, new Eth()),
);

GlobalCoinFactoryGenerator.register(
  Blockchain.Klaytn,
  new Factory<Coin>()
    .register(Coins.Klay, new Klay())
    .register(Coins.Hib, new Hib()),
);
