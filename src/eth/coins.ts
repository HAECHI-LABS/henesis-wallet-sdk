import { Client } from "../httpClient";
import { Coin, CoinDTO, Erc20, Eth, Klay } from "./coin";

export class Coins {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCoin(ticker: string): Promise<Coin> {
    const coinData = await this.client.get<CoinDTO>(
      `/coins/${ticker.toUpperCase()}`
    );
    return this.resolveCoin(coinData);
  }

  public async getCoins(flag?: boolean): Promise<Coin[]> {
    const params = flag ? `?flag=${flag}` : "";
    const coinData: CoinDTO[] = await this.client.get<CoinDTO[]>(
      `/coins${params}`
    );
    return coinData.map((coinDatum) => this.resolveCoin(coinDatum));
  }

  private resolveCoin(coinData: CoinDTO): Coin {
    switch (coinData.symbol.toUpperCase()) {
      case "ETH":
        return new Eth(coinData);
      case "KLAY":
        return new Klay(coinData);
      default:
        return new Erc20(coinData);
    }
  }
}
