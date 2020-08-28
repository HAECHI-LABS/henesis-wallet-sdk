import { Client } from './sdk';
import {
  Coin,
  CoinData,
  StandardErc20,
  Eth,
  Klay,
  NonStandardReturnTypeErc20,
} from './coin';
import { BlockchainType, CoinAttribute } from './types';

export class Coins {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCoin(
    ticker: string,
    blockchain: BlockchainType,
    walletVersion?: string,
  ): Promise<Coin> {
    const coinData = await this.client.get(
      `/coins/${ticker}?blockchain=${blockchain}`,
    );
    return this.resolveCoin(coinData);
  }

  public async getCoins(walletVersion?: string): Promise<Coin[]> {
    const coinData: CoinData[] = await this.client.get<CoinData[]>('/coins');
    return coinData.map((coinDatum) =>
      this.resolveCoin(coinDatum, walletVersion),
    );
  }

  private resolveCoin(coinData: CoinData, walletVersion?: string): Coin {
    if (coinData.symbol.toString() == 'ETH') {
      return new Eth(coinData);
    }

    if (coinData.symbol.toString() == 'KLAY') {
      return new Klay(coinData);
    }

    if (
      (walletVersion == 'v1' || walletVersion == 'v2') &&
      coinData.attributes.includes(CoinAttribute.ERC20_NON_STANDARD_RETURN_TYPE)
    ) {
      return new NonStandardReturnTypeErc20(coinData);
    }

    return new StandardErc20(coinData);
  }
}
