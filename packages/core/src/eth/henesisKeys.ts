import { Client } from "../httpClient";
import { Balance, Key } from "../types";
import { KeyDTO, BalanceDTO } from "../__generate__/eth";
import { BNConverter } from "../utils/common";

export class HenesisKeys {
  private readonly client: Client;

  private readonly baseUrl = "/henesis-keys";

  constructor(client: Client) {
    this.client = client;
  }

  public async getHenesisKey(): Promise<Key> {
    const response = await this.client.get<RequireProperty<KeyDTO, "pub">>(
      `${this.baseUrl}/me`
    );
    return response;
  }

  public async getHenesisKeyBalance(): Promise<Balance> {
    const response = await this.client.get<BalanceDTO>(
      `${this.baseUrl}/balance`
    );
    const { coinType, amount, name, symbol } = response;
    return {
      coinType: coinType as any,
      amount: BNConverter.hexStringToBN(String(amount)),
      name,
      symbol,
    };
  }
}
