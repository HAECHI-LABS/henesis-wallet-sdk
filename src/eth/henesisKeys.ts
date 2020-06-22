import { Client } from "../httpClient";
import { Balance, Key } from "../types";

export class HenesisKeys {
  private readonly client: Client;

  private readonly baseUrl = "/henesis-keys";

  constructor(client: Client) {
    this.client = client;
  }

  public async getHenesisKey(): Promise<Key> {
    return await this.client.get<Key>(`${this.baseUrl}/me`);
  }

  public async getHenesisKeyBalance(): Promise<Balance> {
    return await this.client.get<Balance>(`${this.baseUrl}/balance`);
  }
}
