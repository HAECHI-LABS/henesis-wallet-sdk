import { Balance, Key } from "../types";
import { Client } from "../httpClient";

// TODO: implement me
export interface FilHenesisKey extends Key {
  keyId: string;
}

// TODO: implement me
export class FilHenesisKeys {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getHenesisKey(): Promise<FilHenesisKey> {
    return null;
  }

  async getHenesisKeyBalance(): Promise<Balance> {
    return null;
  }

  getTransactionHistories() {}
}
