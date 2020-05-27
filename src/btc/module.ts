import { Client } from "../httpClient";
import { ModuleOptions } from "../module";

export abstract class BtcSubModule {
  protected getBaseUrl(): string {
    return "/btc"
  }
}

export class BtcModule {
  private readonly client: Client;

  constructor(options: ModuleOptions) {
    this.client = options.client;
  }
}