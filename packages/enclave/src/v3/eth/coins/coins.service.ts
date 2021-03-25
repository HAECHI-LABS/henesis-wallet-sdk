import { CoinData, SDK } from "@haechi-labs/henesis-wallet-core";
import { Injectable } from "@nestjs/common";
import { CoinDTO } from "./coins.dto";

@Injectable()
export class CoinsService {
  public constructor() {}
  public async getCoins(flag: boolean = false, sdk: SDK): Promise<CoinDTO[]> {
    return (await sdk.eth.coins.getCoins(flag))
      .map((coin) => coin.getCoinData())
      .map(this.coinDataToCoinDTO);
  }

  private coinDataToCoinDTO(coinData: CoinData): CoinDTO {
    return {
      id: coinData.id,
      name: coinData.name,
      ticker: coinData.symbol,
      address: coinData.address,
      decimals: coinData.decimals,
      description: coinData.desc,
      blockchain: coinData.blockchain,
    };
  }
}
