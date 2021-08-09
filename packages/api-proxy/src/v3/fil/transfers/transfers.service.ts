import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { GetTransfersOption } from "./dto/get-transfers-options.dto";
import { PaginationDTO } from "../dto/pagination.dto";
import { TransferDTO } from "../dto/transfer.dto";
import { changeUrlHost } from "../../../utils/pagination";
import express from "express";

@Injectable()
export class TransfersService {
  public async getTransfers(
    sdk: SDK,
    options: GetTransfersOption,
    request: express.Request
  ): Promise<PaginationDTO<TransferDTO>> {
    const data = await sdk.fil.transfers.getTransfers(options);

    data.pagination.nextUrl = changeUrlHost(data.pagination.nextUrl, request);
    data.pagination.previousUrl = changeUrlHost(
      data.pagination.previousUrl,
      request
    );
    return {
      pagination: data.pagination,
      results: data.results.map(TransferDTO.fromTransfer),
    };
  }
}
