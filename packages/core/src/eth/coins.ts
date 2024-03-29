import { Client } from "../httpClient";
import {
  Coin,
  StandardErc20,
  Eth,
  Klay,
  NonStandardReturnTypeErc20,
  CoinData,
  AttributesEnum,
  BscBnb,
  Matic,
} from "./coin";

export class Coins {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getCoin(ticker: string): Promise<Coin> {
    const coinData = await this.client.get<CoinData>(`/coins/${ticker}`);
    return this.resolveCoin(coinData);
  }

  async getCoins(flag: boolean): Promise<Coin[]> {
    const coinData = await this.client.get<CoinData[]>(`/coins?flag=${flag}`);
    return coinData.map((coinDatum) => this.resolveCoin(coinDatum));
  }

  private resolveCoin(coinData: CoinData): Coin {
    if (coinData.symbol.toString() == "ETH") {
      return new Eth(coinData);
    }

    if (coinData.symbol.toString() == "KLAY") {
      return new Klay(coinData);
    }

    if (coinData.symbol.toString() == "MATIC") {
      return new Matic(coinData);
    }

    // FIXME: BNB can be used by binance chain
    if (coinData.symbol.toString() == "BNB") {
      return new BscBnb(coinData);
    }

    if (coinData.attributes.includes(AttributesEnum.NONSTANDARDRETURNTYPE)) {
      return new NonStandardReturnTypeErc20(coinData);
    }

    return new StandardErc20(coinData);
  }
}
