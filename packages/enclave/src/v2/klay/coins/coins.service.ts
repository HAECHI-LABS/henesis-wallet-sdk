import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { CoinDTO } from "../../eth/dto/coin.dto";

@Injectable()
export class CoinsService {
  public constructor() {}

  public async getCoins(sdk: SDK, flag?: string): Promise<CoinDTO[]> {
    return (await sdk.klay.coins.getCoins(flag === "true")).map(
      (c) => c.getCoinData() as CoinDTO
    );
  }

  public async getCoin(sdk: SDK, ticker: string): Promise<CoinDTO> {
    return (await sdk.klay.coins.getCoin(ticker)).getCoinData() as CoinDTO;
  }
}
