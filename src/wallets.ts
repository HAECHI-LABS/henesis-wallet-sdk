import { Client } from './sdk';

export class Wallets {
  private readonly client: Client;

  private baseUrl = '/api/v1/wallets';

  constructor(client: Client) {
    this.client = client;
  }
}
