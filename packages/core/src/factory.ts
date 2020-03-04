import { Coin } from './coin';
import { Client } from './sdk';
import { Wallet, WalletInformation } from './wallet';
import { EthereumWallet } from './wallet/ethereumWallet';
import { KlaytnWallet } from './wallet/klaytnWallet';
import {
  Eth,
  Klay,
} from './coins';

export type DefaultCoinConstructor = (keychains: any) => Coin;
export type DefaultWalletConstructor = (client: Client, walletInformation: WalletInformation) => Wallet;

export class Factory<T> {
  private c = new Map<string, T>();

  public get(name: string): T {
    const coin = this.c.get(name);
    if (coin) {
      return coin;
    }
    throw new Error(`unknown type: ${coin}`);
  }

  public register(name: string, item: T): void {
    this.c.set(name, item);
  }
}

export const GlobalWalletFactory: Factory<DefaultWalletConstructor> = new Factory<DefaultWalletConstructor>();
GlobalWalletFactory.register('ethereum', EthereumWallet.createInstance);
GlobalWalletFactory.register('klaytn', KlaytnWallet.createInstance);

export const GlobalCoinFactory: Factory<DefaultCoinConstructor> = new Factory<DefaultCoinConstructor>();
GlobalCoinFactory.register('eth', Eth.createInstance);
GlobalCoinFactory.register('klay', Klay.createInstance);
