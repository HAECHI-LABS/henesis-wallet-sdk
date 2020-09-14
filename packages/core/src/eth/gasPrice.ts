import { GetGasPriceResponse } from "../__generate__/eth";
import * as BN from "bn.js";
import { Client } from "../httpClient";
import { BNConverter } from "..";

export class GasPrice {
  private readonly client: Client;

  private readonly baseUrl;

  constructor(client: Client) {
    this.client = client;
    this.baseUrl = "/gas-price";
  }

  public async getGasPrice(): Promise<BN> {
    const response = await this.client.get<GetGasPriceResponse>(
      `${this.baseUrl}`
    );

    return BNConverter.hexStringToBN(response.gasPrice);
  }
}
