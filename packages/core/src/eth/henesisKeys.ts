import { Client } from "../httpClient";
import { Balance, Key } from "../types";
import { KeyDTO, BalanceDTO } from "../__generate__/eth";
import { BNConverter } from "../";

export class HenesisKeys {
  private readonly client: Client;

  private readonly baseUrl = "/henesis-keys";

  constructor(client: Client) {
    this.client = client;
  }

  getHenesisKey(): Promise<Key> {
    return this.client.get<RequireProperty<KeyDTO, "pub">>(
      `${this.baseUrl}/me`
    );
  }

  async getHenesisKeyBalance(): Promise<Balance> {
    const response = await this.client.get<BalanceDTO>(
      `${this.baseUrl}/balance`
    );
    const { coinId, coinType, amount, name, symbol } = response;
    return {
      coinId: coinId,
      coinType: coinType as any,
      amount: BNConverter.hexStringToBN(String(amount)),
      name,
      symbol,
    };
  }
}
