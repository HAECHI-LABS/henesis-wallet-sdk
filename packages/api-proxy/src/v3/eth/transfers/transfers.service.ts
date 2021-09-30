import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { TransferDTO } from "../dto/transfer.dto";
import { GetTransfersOption } from "./dto/get-transfers-option.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { EthValueTransferEvent } from "@haechi-labs/henesis-wallet-core/lib/events";
import { object } from "../../../utils/object";
import { changeUrlHost } from "../../../utils/pagination";
import express from "express";

@Injectable()
export class TransfersService {
  public async getTransfers(
    sdk: SDK,
    options: GetTransfersOption,
    request: express.Request
  ): Promise<PaginationDTO<TransferDTO>> {
    const result: Pagination<EthValueTransferEvent> =
      await sdk.eth.events.getValueTransferEvents(
        object(GetTransfersOption.toSDKOption(options))
      );

    result.pagination.nextUrl = changeUrlHost(
      result.pagination.nextUrl,
      request
    );
    result.pagination.previousUrl = changeUrlHost(
      result.pagination.previousUrl,
      request
    );
    return {
      pagination: result.pagination,
      results: result.results.map(TransferDTO.fromValueTransferEvent),
    };
  }
}
