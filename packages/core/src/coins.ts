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
  ): Promise<Coin> {
    const coinData = await this.client.get(
      `/coins/${ticker}?blockchain=${blockchain}`,
    );
    return this.resolveCoin(coinData);
  }

  public async getCoins(): Promise<Coin[]> {
    const coinData: CoinData[] = await this.client.get<CoinData[]>('/coins');
    return coinData.map((coinDatum) => this.resolveCoin(coinDatum));
  }

  private resolveCoin(coinData: CoinData): Coin {
    if (coinData.symbol.toString() == 'ETH') {
      return new Eth(coinData);
    }

    if (coinData.symbol.toString() == 'KLAY') {
      return new Klay(coinData);
    }

    if (coinData.attributes.includes(CoinAttribute.ERC20_STANDARD)) {
      return new StandardErc20(coinData);
    }

    if (
      coinData.attributes.includes(CoinAttribute.ERC20_NON_STANDARD_RETURN_TYPE)
    ) {
      return new NonStandardReturnTypeErc20(coinData);
    }

    throw new Error('no matched coin attributes');
  }
}
