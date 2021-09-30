import { Injectable } from "@nestjs/common";
import { Coin, SDK } from "@haechi-labs/henesis-wallet-core";
import { CoinDTO } from "../../eth/dto/coin.dto";

@Injectable()
export class CoinsService {
  public constructor() {}

  public async getCoins(sdk: SDK, flag: boolean = false): Promise<CoinDTO[]> {
    const coins: Coin[] = await sdk.bsc.coins.getCoins(flag);
    return coins.map(CoinDTO.fromCoin);
  }

  public async getCoin(coinId: string, sdk: SDK): Promise<CoinDTO> {
    return CoinDTO.fromCoin(await sdk.bsc.coins.getCoin(coinId));
  }
}
