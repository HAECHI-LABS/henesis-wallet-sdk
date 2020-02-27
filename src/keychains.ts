import {Client} from "./sdk";

export class Keychains {
  private client: Client;

  constructor(client) {
    this.client = client;
  }
}