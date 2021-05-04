import { Injectable } from "@nestjs/common";
import { CoinDTO } from "../dto/coin.dto";
import { SDK } from "@haechi-labs/henesis-wallet-core";

@Injectable()
export class CoinsService {
  public constructor() {}

  public async getCoins(sdk: SDK, flag?: string): Promise<CoinDTO[]> {
    return (await sdk.eth.coins.getCoins(flag === "true")).map(
      (c) => c.getCoinData() as CoinDTO
    );
  }

  public async getCoin(sdk: SDK, ticker: string): Promise<CoinDTO> {
    return (await sdk.eth.coins.getCoin(ticker)).getCoinData() as CoinDTO;
  }
}
