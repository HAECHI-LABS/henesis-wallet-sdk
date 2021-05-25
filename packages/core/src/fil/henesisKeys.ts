import { Balance, Key } from "../types";
import { Client } from "../httpClient";

// TODO: implement me
export interface HenesisKey extends Key {}

// TODO: implement me
export class HenesisKeys {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getHenesisKey(): Promise<HenesisKey> {
    return null;
  }

  async getHenesisKeyBalance(): Promise<Balance> {
    return null;
  }

  getTransactionHistories() {}
}
