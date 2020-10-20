import { Client } from "../httpClient";
import { Balance, Key } from "../types";
import { BalanceDTO, HenesisKeyDTO } from "../__generate__/eth";
import { BNConverter } from "../";

export interface HenesisKey extends Key {
  feeDelegationEnabled: boolean;
}

export class HenesisKeys {
  private readonly client: Client;

  private readonly baseUrl = "/henesis-keys";

  constructor(client: Client) {
    this.client = client;
  }

  getHenesisKey(): Promise<HenesisKey> {
    return this.client.get<RequireProperty<HenesisKeyDTO, "pub">>(
      `${this.baseUrl}/me`
    );
  }

  async getHenesisKeyBalance(): Promise<Balance> {
    const response = await this.client.get<BalanceDTO>(
      `${this.baseUrl}/balance`
    );
    const { coinId, coinType, amount, name, symbol, decimals } = response;
    return {
      coinId: coinId,
      coinType: coinType as any,
      amount: BNConverter.hexStringToBN(String(amount)),
      name,
      symbol,
      decimals,
    };
  }
}
