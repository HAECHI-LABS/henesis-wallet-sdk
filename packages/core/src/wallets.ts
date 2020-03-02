import { Client } from './sdk';
import { Wallet } from './wallet';

export class Wallets {
  private readonly client: Client;

  private baseUrl = '/api/v1/wallets';

  constructor(client: Client) {
    this.client = client;
  }
}
