import { Injectable } from "@nestjs/common";
import { SDK } from "@haechi-labs/henesis-wallet-core";
import { PaginationDTO } from "../dto/pagination.dto";
import { Transfer } from "@haechi-labs/henesis-wallet-core/lib/bch/transfers";
import { Pagination } from "@haechi-labs/henesis-wallet-core/lib/types";
import { TransferDTO } from "../dto/transfer.dto";
import express from "express";
import { changeUrlHost } from "../../../utils/pagination";

@Injectable()
export class TransfersService {
  public constructor() {}

  public async getTransfers(
    sdk: SDK,
    query: any,
    request: express.Request
  ): Promise<PaginationDTO<TransferDTO>> {
    const result: Pagination<Transfer> = await sdk.bch.transfers.getTransfers(
      query
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
      results: result.results.map(TransferDTO.fromTransfer),
    };
  }

  public async getTransfer(sdk: SDK, transferId: string): Promise<TransferDTO> {
    return TransferDTO.fromTransfer(
      await sdk.bch.transfers.getTransfer(transferId)
    );
  }
}
