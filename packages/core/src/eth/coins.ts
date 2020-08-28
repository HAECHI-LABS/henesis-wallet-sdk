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

export class Coins {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getCoin(ticker: string, walletVersion?: string): Promise<Coin> {
    const coinData = await this.client.get<CoinDTO>(`/coins/${ticker}`);
    return this.resolveCoin(coinData, walletVersion);
  }

  public async getCoins(
    flag: boolean,
    walletVersion?: string
  ): Promise<Coin[]> {
    const coinData = await this.client.get<CoinDTO[]>(`/coins?flag=${flag}`);
    return coinData.map((coinDatum) =>
      this.resolveCoin(coinDatum, walletVersion)
    );
  }

  private resolveCoin(coinData: CoinDTO, walletVersion?: string): Coin {
    if (coinData.symbol.toString() == "ETH") {
      return new Eth(coinData);
    }

    if (coinData.symbol.toString() == "KLAY") {
      return new Klay(coinData);
    }

    if (
      (walletVersion == "v1" || walletVersion == "v2") &&
      coinData.attributes.includes(AttributesEnum.NONSTANDARDRETURNTYPE)
    ) {
      return new NonStandardReturnTypeErc20(coinData);
    }

    return new StandardErc20(coinData);
  }
}
