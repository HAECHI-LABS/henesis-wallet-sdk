import { Client } from "../httpClient";
import {
  Coin,
  StandardErc20,
  Eth,
  Klay,
  NonStandardReturnTypeErc20,
} from "./coin";
import { CoinDTO } from "../__generate__/eth";
import AttributesEnum = CoinDTO.AttributesEnum;
import { InternalServerError } from "../error";

export class Coins {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCoin(ticker: string): Promise<Coin> {
    const coinData = await this.client.get<CoinDTO>(`/coins/${ticker}`);
    return this.resolveCoin(coinData);
  }

  public async getCoins(flag?: boolean): Promise<Coin[]> {
    const params = flag ? `?flag=${flag}` : "";
    const coinData = await this.client.get<CoinDTO[]>(`/coins${params}`);
    return coinData.map((coinDatum) => this.resolveCoin(coinDatum));
  }

  private resolveCoin(coinData: CoinDTO): Coin {
    if (coinData.symbol.toString() == "ETH") {
      return new Eth(coinData);
    }

    if (coinData.symbol.toString() == "KLAY") {
      return new Klay(coinData);
    }

    if (coinData.attributes.includes(AttributesEnum.STANDARD)) {
      return new StandardErc20(coinData);
    }

    if (coinData.attributes.includes(AttributesEnum.NONSTANDARDRETURNTYPE)) {
      return new NonStandardReturnTypeErc20(coinData);
    }

    throw new InternalServerError("no matched coin attributes");
  }
}
