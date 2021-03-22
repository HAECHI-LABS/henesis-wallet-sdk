import { GetGasPriceResponse } from "src/__generate__/eth";
import * as BN from "bn.js";
import { Client } from "src/httpClient";
import { BNConverter } from "@utils/common";

export class GasPrice {
  private readonly client: Client;

  private readonly baseUrl;

  constructor(client: Client) {
    this.client = client;
    this.baseUrl = "/gas-price";
  }

  async getGasPrice(): Promise<BN> {
    const response = await this.client.get<GetGasPriceResponse>(
      `${this.baseUrl}`
    );

    return BNConverter.hexStringToBN(response.gasPrice);
  }
}
