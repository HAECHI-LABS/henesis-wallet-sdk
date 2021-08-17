import { Coin, SDK } from "@haechi-labs/henesis-wallet-core";
import { Injectable } from "@nestjs/common";
import { CoinDTO } from "../dto/coin.dto";

@Injectable()
export class CoinsService {
  public constructor() {}

  public async getCoins(sdk: SDK, flag: boolean = false): Promise<CoinDTO[]> {
    const coins: Coin[] = await sdk.eth.coins.getCoins(flag);
    return coins.map(CoinDTO.fromCoin);
  }

  public async getCoin(sdk: SDK, ticker: string): Promise<CoinDTO> {
    return CoinDTO.fromCoin(await sdk.eth.coins.getCoin(ticker));
  }
}
