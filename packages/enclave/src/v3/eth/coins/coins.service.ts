import { SDK } from "@haechi-labs/henesis-wallet-core";
import { Injectable } from "@nestjs/common";
import { CoinDTO } from "../dto/coin.dto";

@Injectable()
export class CoinsService {
  public constructor() {}

  public async getCoins(flag: boolean = false, sdk: SDK): Promise<CoinDTO[]> {
    return null;
  }

  public async getCoin(coinId: string, sdk: SDK): Promise<CoinDTO> {
    return null;
  }
}
