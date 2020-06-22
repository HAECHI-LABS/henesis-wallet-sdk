import * as BN from "bn.js";
import { Pagination } from "../types";
import { Client } from "../httpClient";
import { BNConverter } from "../utils/common";
import { BtcEventPaginationOptions, BtcValueTransferEvent } from "../events";
import { PaginationValueTransferEventDTO } from "../__generate__/btc";
import { makeQueryString } from "../utils/url";

export class BtcEvents {
  private readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public async getValueTransferEvents(
    walletId: string,
    options?: BtcEventPaginationOptions
  ): Promise<Pagination<BtcValueTransferEvent>> {
    const queryString: string = makeQueryString(options);
    const data: PaginationValueTransferEventDTO = await this.client.get(
      `/${walletId}/value-transfer-events${
        queryString ? `?${queryString}` : ""
      }`
    );

    return {
      pagination: data.pagination,
      results: data.results.map((e) => {
        return {
          createdAt: e.createdAt,
          status: null,
          transactionHash: e.transactionHash,
          walletId: e.id,
          amount: BNConverter.hexStringToBN(String(e.amount)),
          coinSymbol: "BTC",
          from: "",
          to: e.to,
          transferType: e.transferType,
        };
      }),
    };
  }
}
